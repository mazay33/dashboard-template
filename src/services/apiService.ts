import HttpService from './httpService';
import AuthApi from './api/auth/authApi';
import UserApi from './api/user/userApi';

export * from './api/auth/authApi';
export * from './api/user/userApi';

class ApiService {
	readonly auth: AuthApi;
	readonly user: UserApi;

	constructor(httpService: HttpService) {
		this.auth = new AuthApi(httpService);
		this.user = new UserApi(httpService);
	}
}

let apiServiceInstance: ApiService | undefined;

function useApiService(httpService?: HttpService): ApiService {
	if (!apiServiceInstance) {
		apiServiceInstance = new ApiService(httpService || new HttpService());
	}
	return apiServiceInstance;
}

export default useApiService;
