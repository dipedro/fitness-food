export interface IHttpRequestService {
    get<T = any>(
        url: string,
        config?: Record<string, any>,
    ): Promise<IHttpResponse<T>>;
    post<T = any>(
        url: string,
        body?: any,
        config?: Record<string, any>,
    ): Promise<IHttpPostResponse<T>>;
    patch(
        url: string,
        body?: any,
        config?: Record<string, any>,
    ): Promise<IHttpResponse>;
    put<T = any>(
        url: string,
        body?: any,
        config?: Record<string, any>,
    ): Promise<IHttpResponse<T>>;
    delete<T = any>(
        url: string,
        config?: Record<string, any>,
    ): Promise<IHttpResponse<T>>;
}

export interface IHttpResponse<T = any> {
    status: number;
    body: T;
    response?: Response;
}

export interface IHttpPostResponse<T = any> extends IHttpResponse<T> {
    headers: Record<string, any>;
}
