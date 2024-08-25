import type { HttpBodyType, HttpReturnType } from '../httpService';
import type HttpService from '../httpService';
import { HttpMethod } from '../httpService';
import type { UseFetchOptions } from '#app';

export default abstract class BaseApi {
	protected abstract getHttpService(): HttpService;

	// Сигнатура для методов без тела запроса
	protected async sendRequest<TResponse>(
		httpMethod: HttpMethod.GET | HttpMethod.DELETE,
		resourcePath: string,
		options?: UseFetchOptions<TResponse>,
	): Promise<HttpReturnType<TResponse>>;

	// Сигнатура для методов с телом запроса
	protected async sendRequest<TResponse, TRequest>(
		httpMethod: HttpMethod.POST | HttpMethod.PUT | HttpMethod.PATCH,
		resourcePath: string,
		request: HttpBodyType<TRequest>,
		options?: UseFetchOptions<TResponse>,
	): Promise<HttpReturnType<TResponse>>;

	// Реализация метода
	protected async sendRequest<TResponse, TRequest = void>(
		httpMethod: HttpMethod,
		resourcePath: string,
		requestOrOptions?: HttpBodyType<TRequest> | UseFetchOptions<TResponse>,
		options?: UseFetchOptions<TResponse>,
	): Promise<HttpReturnType<TResponse>> {
		const currentResourcePath = this.getResourcePath(resourcePath);
		const httpService = this.getHttpService();

		const requestMethodMap: Record<HttpMethod, () => HttpReturnType<TResponse>> = {
			[HttpMethod.GET]: () =>
				httpService.get<TResponse>(currentResourcePath, requestOrOptions as UseFetchOptions<TResponse>),
			[HttpMethod.POST]: () =>
				httpService.post<TResponse, TRequest>(
					currentResourcePath,
					requestOrOptions as HttpBodyType<TRequest>,
					options,
				),
			[HttpMethod.PATCH]: () =>
				httpService.patch<TResponse, TRequest>(
					currentResourcePath,
					requestOrOptions as HttpBodyType<TRequest>,
					options,
				),
			[HttpMethod.PUT]: () =>
				httpService.put<TResponse, TRequest>(
					currentResourcePath,
					requestOrOptions as HttpBodyType<TRequest>,
					options,
				),
			[HttpMethod.DELETE]: () =>
				httpService.delete<TResponse>(currentResourcePath, requestOrOptions as UseFetchOptions<TResponse>),
		};

		return this.executeRequest(httpMethod, requestMethodMap[httpMethod]);
	}

	private executeRequest<TResponse>(
		httpMethod: HttpMethod,
		handler: () => HttpReturnType<TResponse>,
	): HttpReturnType<TResponse> {
		return handler();
	}

	getResourcePath(resourceName: string): string {
		return resourceName;
	}
}
