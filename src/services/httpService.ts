import type { UseFetchOptions } from 'nuxt/app';
import type { FetchError } from 'ofetch';
import type { Ref } from 'vue';
import type { KeysOf, PickFrom, _AsyncData } from '#app/composables/asyncData';

export type HttpReturnType<T> = Promise<_AsyncData<PickFrom<T, KeysOf<T>> | null, FetchError<any> | null>>;

export type HttpBodyType<T> = T extends Ref<Record<string, any>> ? T : Record<string, any>;

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
}

export interface IHttpService {
	get: <T>(url: string, options?: UseFetchOptions<T>) => HttpReturnType<T>;
	post: <T, U>(url: string, body: HttpBodyType<U>, options?: UseFetchOptions<T>) => HttpReturnType<T>;
	put: <T, U>(url: string, body: HttpBodyType<U>, options?: UseFetchOptions<T>) => HttpReturnType<T>;
	delete: <T>(url: string, options?: UseFetchOptions<T>) => HttpReturnType<T>;
	patch: <T, U>(url: string, body: HttpBodyType<U>, options?: UseFetchOptions<T>) => HttpReturnType<T>;
}

export default class HttpService implements IHttpService {
	private async request<T, U>(
		method: HttpMethod,
		url: string,
		body?: HttpBodyType<U>,
		options: UseFetchOptions<T> = {},
	): HttpReturnType<T> {
		const response = await useAPI<T>(url, {
			method,
			body,
			...options,
		});
		return response;
	}

	/**
	 * Выполняет GET-запрос к указанному URL.
	 */
	public get<T>(url: string, options: UseFetchOptions<T> = {}): HttpReturnType<T> {
		return this.request<T, never>(HttpMethod.GET, url, undefined, options);
	}

	/**
	 * Выполняет POST-запрос к указанному URL с переданным телом запроса.
	 */
	public post<T, U>(url: string, body: HttpBodyType<U>, options: UseFetchOptions<T> = {}): HttpReturnType<T> {
		return this.request<T, U>(HttpMethod.POST, url, body, options);
	}

	/**
	 * Выполняет PUT-запрос к указанному URL с переданным телом запроса.
	 */
	public put<T, U>(url: string, body: HttpBodyType<U>, options: UseFetchOptions<T> = {}): HttpReturnType<T> {
		return this.request<T, U>(HttpMethod.PUT, url, body, options);
	}

	/**
	 * Выполняет PATCH-запрос к указанному URL с переданным телом запроса.
	 */
	public patch<T, U>(url: string, body: HttpBodyType<U>, options: UseFetchOptions<T> = {}): HttpReturnType<T> {
		return this.request<T, U>(HttpMethod.PATCH, url, body, options);
	}

	/**
	 * Выполняет DELETE-запрос к указанному URL.
	 */
	public delete<T>(url: string, options: UseFetchOptions<T> = {}): HttpReturnType<T> {
		return this.request<T, never>(HttpMethod.DELETE, url, undefined, options);
	}
}
