
import { ICronProduct } from '@modules/product/interfaces/cron-product.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RepositoryNameEnum } from '@shared/enums';
import { IHttpRequestService } from '@shared/interfaces';
import { Readable } from 'stream';
import { createGunzip } from 'zlib';


@Injectable()
export class NestJSSchedulerService implements ICronProduct {
  private readonly logger = new Logger(NestJSSchedulerService.name);

  constructor(
    @Inject(RepositoryNameEnum.HTTP_REQUEST_SERVICE)
    private readonly httpRequestService: IHttpRequestService,
  ) {}

  //@Cron(CronExpression.EVERY_DAY_AT_2AM)
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCronProduct() {
    this.logger.log('Cron job is running...');

    const url = `${process.env.OPEN_FOOD_BASE_URL}${process.env.OPEN_FOOD_FILE_LIST_NAME}`

    const { body } = await this.httpRequestService.get(url, { responseType: 'text' });

    const fileNames = body.split('\n') as string[];

    this.removeLastEmptyLine(fileNames);

    const result = await this.extractDataFromStream(fileNames);

    // TODO: Implement the T (transform) from ETL process

    // TODO: Implement the L (load) from ETL process

  }

  private async extractDataFromStream(fileNames: string[]): Promise<string[]> {
    const result: string[] = [];
    const MAX_LINES_FOR_FILE = 100;

    for (const [index, fileName] of fileNames.entries()) {
      const fileUrl = `${process.env.OPEN_FOOD_BASE_URL}${fileName}`;
      const response  = await fetch(fileUrl);
      const gunzipStream = response.body.pipeThrough(new TransformStream({
        transform(chunk, controller) {
          controller.enqueue(Buffer.from(chunk));
        }
      }));

      const gunzip = createGunzip();

      const decompressedStream = Readable.fromWeb(gunzipStream).pipe(gunzip);

      let buffer = '';

      for await (const chunk of decompressedStream) {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        
        const hasAlreadyReachedAllLines = result.length >= (MAX_LINES_FOR_FILE * (index + 1));

        while (lines.length > 1 && !hasAlreadyReachedAllLines) {
          result.push(lines.shift());
        }

        buffer = lines.join('\n');

        if (hasAlreadyReachedAllLines) break;
      }
    }
    
    this.logger.log('Data fetched from external API', fileNames.length , result.length);
    return result;
  }

  private removeLastEmptyLine(array: string[]) {
    if (array.length && !array[array.length - 1])
      array.pop();
  }
}
