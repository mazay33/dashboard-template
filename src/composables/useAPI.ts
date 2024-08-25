import type { UseFetchOptions } from 'nuxt/app';
import type { HttpReturnType } from '~/services/httpService';

export function useAPI<T>(url: string | (() => string), options: UseFetchOptions<T> = {}): HttpReturnType<T> {
	return useFetch(url, {
		...options,
		$fetch: useNuxtApp().$api,
	});
}
