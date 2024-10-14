import { Injectable } from "@nestjs/common";
import { IHttpPostResponse, IHttpRequestService, IHttpResponse } from "@shared/interfaces";

@Injectable()
export class FetchRequestService implements IHttpRequestService {
	async get<T>(url: string, config?: Record<string, any>): Promise<IHttpResponse<T>> {
		try {
			const response = await fetch(url, config);

			let body: T;

			if (config?.responseType === "text") {
				body = (await response.text()) as unknown as T;
				return {
					status: response.status,
					body
				};
			}

			body = (await response) as unknown as T;
			return {
				status: response.status,
				body
			};
		} catch (error) {
			throw new Error(error);
		}
	}

	post<T = any>(url: string, body?: any, config?: Record<string, any>): Promise<IHttpPostResponse<T>> {
		throw new Error("Method not implemented.");
	}
	patch(url: string, body?: any, config?: Record<string, any>): Promise<IHttpResponse> {
		throw new Error("Method not implemented.");
	}
	put<T = any>(url: string, body?: any, config?: Record<string, any>): Promise<IHttpResponse<T>> {
		throw new Error("Method not implemented.");
	}
	delete<T = any>(url: string, config?: Record<string, any>): Promise<IHttpResponse<T>> {
		throw new Error("Method not implemented.");
	}
	
}