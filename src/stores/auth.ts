import useApiService from '~/services/apiService';

const apiService = useApiService();

export const useAuthStore = defineStore('auth', () => {
	const userStore = useUserStore();
	const accessToken = ref<string>();
	const isAuthenticated = computed(() => {
		return !!accessToken.value;
	});
	const isAuthModalOpen = ref(false);
	const authModalCustomText = ref('');
	const isAuthCustomTextVisible = computed(() => {
		return !!authModalCustomText.value;
	});

	const login = async (email: string, password: string): Promise<void> => {
		const { data, error } = await apiService.auth.login(email, password);
		if (data.value) {
			accessToken.value = data?.value?.accessToken;
			await userStore.getMe();
		}
		if (error.value) {
			console.error(error.value.data);
		}
	};

	const loginWithGoogle = async (tokenQuery: string): Promise<void> => {
		const { data, error } = await apiService.auth.loginWithGoogle(tokenQuery);

		if (data.value) {
			accessToken.value = data?.value?.accessToken;

			await userStore.getMe();
			nextTick(() => {
				useRouter().go(-1);
			});
		}
		if (error.value) {
			console.error(error.value.data);
		}
	};
	const loginWithYandex = async (tokenQuery: string): Promise<void> => {
		const { data, error } = await apiService.auth.loginWithYandex(tokenQuery);

		if (data.value) {
			accessToken.value = data?.value?.accessToken;

			await userStore.getMe();
			nextTick(async () => {
				const previousRoute = localStorage.getItem('previousRoute');
				if (previousRoute) {
					await useRouter().push(previousRoute);
					localStorage.removeItem('previousRoute');
				} else {
					await useRouter().push('/');
				}
			});
		}
		if (error.value) {
			console.error(error.value.data);
		}
	};

	const logout = async (): Promise<void> => {
		const { data, error } = await apiService.auth.logout();
		if (data.value) {
			accessToken.value = undefined;
			userStore.user = undefined;
		}
		if (error.value) {
			console.error(error.value.data);
		}
	};

	return {
		login,
		loginWithGoogle,
		loginWithYandex,
		logout,
		accessToken,
		isAuthenticated,
		isAuthModalOpen,
		authModalCustomText,
		isAuthCustomTextVisible,
	};
});
