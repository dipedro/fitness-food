
import { ICronProduct } from '@modules/product/interfaces/cron-product.interface';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RepositoryNameEnum } from '@shared/enums';
import { IHttpRequestService } from '@shared/interfaces';
import { Readable } from 'stream';
import { createGunzip } from 'zlib';
import { ICronHistoryRepository } from './repositories/cron-history.repository';
import { IProductPreloadRepository } from './repositories/product-preload.repository';
import { Product } from '../../databases/postgres/repositories/product.repository';
import { IProductRepository } from '@modules/product/repositories/product.repository';


@Injectable()
export class NestJSSchedulerService implements ICronProduct {
  private readonly logger = new Logger(NestJSSchedulerService.name);

  constructor(
    @Inject(RepositoryNameEnum.HTTP_REQUEST_SERVICE)
    private readonly httpRequestService: IHttpRequestService,
    @Inject(RepositoryNameEnum.CRON_HISTORY_REPOSITORY)
    private readonly cronHistoryRepository: ICronHistoryRepository,
    @Inject(RepositoryNameEnum.PRODUCT_PRELOAD_REPOSITORY)
    private readonly productPreloadRepository: IProductPreloadRepository,
    @Inject(RepositoryNameEnum.PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository
  ) {}

  // TODO: need refactoring to Single Responsibility Principle
  //@Cron(CronExpression.EVERY_DAY_AT_2AM)
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCronProduct() {
    this.logger.log('Cron job is running...');

    const url = `${process.env.OPEN_FOOD_BASE_URL}${process.env.OPEN_FOOD_FILE_LIST_NAME}`

    const { body } = await this.httpRequestService.get(url, { responseType: 'text' });

    const fileNames = body.split('\n') as string[];

    this.removeLastEmptyLineIfExists(fileNames);

    const extractedData = await this.extractDataFromStream(fileNames);

    const transformedData = this.transformData(extractedData);

    const cronId = await this.loadData(transformedData);

    await this.processData(cronId);

    this.logger.log('Cron job is finished');
  }

  private async extractDataFromStream(fileNames: string[]): Promise<string[]> {
    this.logger.log('Starting extraction')
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
    
    this.logger.log('Finish extraction', fileNames.length , result.length);
    return result;
  }

  private transformData(data: string[]): string[] {
    this.logger.log('Starting transformation');
    const fieldsToKeep = [
      'code',
      'url',
      'creator',
      'created_t',
      'last_modified_t',
      'product_name',
      'quantity',
      'brands',
      'categories',
      'labels',
      'cities',
      'purchase_places',
      'stores',
      'ingredients_text',
      'traces',
      'serving_size',
      'serving_quantity',
      'nutriscore_score',
      'nutriscore_grade',
      'main_category',
      'image_url',
    ];

    const formattedList = data.map((item) => {
      const parsedItem = JSON.parse(item);
      const formattedItem: any = {};
      fieldsToKeep.forEach((field) => {
        if (parsedItem.hasOwnProperty(field)) {
          let value = parsedItem[field] as string;
          
          if (field === 'code')
            value = value.replaceAll('"', '');

          const escapedData = value.replace(/'/g, '')

          formattedItem[field] = escapedData;
        }
      });
      return formattedItem;
    });

    this.logger.log('Finish transformation');
    return formattedList;
  }

  async loadData(data: string[]): Promise<number> {
    this.logger.log('Starting load data');
    const cronHistoryId = await this.cronHistoryRepository.create();

    await this.productPreloadRepository.createMany({ cronId: cronHistoryId, productData: data });

    this.logger.log('Finish load data');

    return cronHistoryId;
  }

  async processData(cronId: number) {
    this.logger.log('Starting process data');
    const products = await this.productPreloadRepository.findByCronId(cronId);

    await this.productRepository.createMany(products as Product[]);

    await Promise.all([
      this.productPreloadRepository.updateImportedAt(cronId),
      this.cronHistoryRepository.updateImportedAt(cronId),
    ]);

    this.logger.log('Finish process data');
  }

  private removeLastEmptyLineIfExists(array: string[]) {
    if (array.length && !array[array.length - 1])
      array.pop();
  }
}
