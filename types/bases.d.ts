import { AxiosResponse, AxiosRequestConfig } from 'axios';



export type AegisRequestConfig = {
	prefix?: string | undefined;
	willAlertFailed?: boolean | undefined;
	willAlertFailedAsync?: boolean | undefined;
};


export type AegisGet = (action: string, params?: Object | undefined, config?: AxiosRequestConfig & AegisRequestConfig | undefined) => Promise<any | AxiosResponse>;
export type AegisPost = (action: string, params?: Object | undefined, config?: AxiosRequestConfig & AegisRequestConfig | undefined) => Promise<any | AxiosResponse>;
export type AegisJump = (action: string, params?: Object | undefined, config?: Object | undefined) => Promise<void>;
export type AegisOpen = (action: string, params?: Object | undefined, config?: Object | undefined) => Promise<void>;
