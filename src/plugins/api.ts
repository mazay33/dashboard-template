import { appendResponseHeader } from 'h3';
import type { AccessToken } from '~/services/api/auth/authApi.types';

export default defineNuxtPlugin(() => {
	const config = useRuntimeConfig();
	const authStore = useAuthStore();
	const { accessToken } = storeToRefs(authStore);
	const event = useRequestEvent();
	const headers = useRequestHeaders(['cookie']);

	const $api = $fetch.create({
		baseURL: config.public.api as string,
		credentials: 'include',
		retry: 1,
		retryStatusCodes: [401],

		onRequest({ options }) {
			options.headers = accessToken.value ? { Authorization: `${accessToken.value}` } : {};
		},
		onResponse: async ({ response, options }) => {
			if (response.status === 401) {
				try {
					const newToken = await refresh();
					if (newToken) {
						accessToken.value = newToken.accessToken;
						options.headers = { Authorization: `${newToken.accessToken}` };
					}
				} catch (error) {
					options.retry = false;
					await authStore.logout();
					console.error('Token refresh failed:', error);
				}
			}
		},
		onResponseError: async ({ response }) => {
			if (response.status !== 401) {
				console.error('Неизвестная ошибка:', response);
				console.warn(
					'Сообщение:',
					response._data?.message,
					'Код:',
					response.status,
					'Текст:',
					response._data?.message,
				);
			}
		},
	});

	let refreshTokenPromise: Promise<AccessToken | null> | null = null;

	async function refresh(): Promise<AccessToken | null> {
		if (!refreshTokenPromise) {
			refreshTokenPromise = (async () => {
				if (import.meta.server) {
					const res = await $fetch.raw(`${config.public.api}auth/refresh-tokens`, {
						method: 'GET',
						credentials: 'include',
						headers,
					});
					const cookies = (res.headers.get('set-cookie') || '').split(',');
					for (const cookie of cookies) {
						appendResponseHeader(event!, 'set-cookie', `${cookie}; SameSite=Lax; Secure; HttpOnly=true`);
					}
					return res._data as AccessToken;
				} else if (import.meta.client) {
					try {
						const res = await $fetch(`${config.public.api}auth/refresh-tokens`, {
							method: 'GET',
							credentials: 'include',
							headers,
						});
						return res as AccessToken;
					} catch (error) {
						console.error('Token refresh failed:', error);
						throw error;
					} finally {
						refreshTokenPromise = null;
					}
				} else {
					return null;
				}
			})();
		}
		return refreshTokenPromise;
	}

	// Expose to useNuxtApp().$api
	return {
		provide: {
			api: $api,
		},
	};
});
