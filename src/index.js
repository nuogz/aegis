import Axios from 'axios';

import { copyJSON } from '@nuogz/utility';



export default class Aegis {
	static alert = (message, title) => window.alert((title ? title + ':\n' : '') + message);



	alert = Aegis.alert;
	prefixDefault = './api';

	constructor(alert, prefixDefault) {
		if(alert) { this.alert = alert; }
		if(prefixDefault) { this.prefixDefault = prefixDefault; }
	}


	parseURLAction = (action, prefix = this.prefixDefault) => {
		return `${prefix}${prefix.endsWith('/') ? '' : '/'}${action}`;
	};

	parseResult = async result => {
		if(result.success) {
			if(result.message && this.alert) { await this.alert(result.message, result.messageTitle); }

			return result.data;
		}
		else {
			throw result.message || '请求不成功';
		}
	};


	$get = async (action, params, config = {}) => {
		const configRequest = copyJSON(Object.assign({ params }, config));


		const urlAction = this.parseURLAction(action, configRequest.prefix);
		delete configRequest.prefix;

		const typeReturn = configRequest.return ?? 'data-parsed';
		delete configRequest.return;


		const response = await Axios.get(urlAction, configRequest);


		if(typeReturn == 'response') { return response; }
		if(typeReturn == 'raw') { return response.data; }
		else { return this.parseResult(response.data); }
	};

	$post = async (action, params, config = {}, alertUnSuccess = false) => {
		const configRequest = copyJSON(config);

		if(params instanceof FormData) {
			if(typeof configRequest.headers == 'object' && configRequest.headers) {
				configRequest.headers['Content-Type'] = 'multipart/form-data';
			}
			else {
				configRequest.headers = { 'Content-Type': 'multipart/form-data' };
			}
		}


		const urlAction = this.parseURLAction(action, configRequest.prefix);
		delete configRequest.prefix;

		const typeReturn = configRequest.return ?? 'data-parsed';
		delete configRequest.return;


		const response = await Axios.post(urlAction, params, configRequest);


		if(typeReturn == 'response') { return response; }
		if(typeReturn == 'raw') { return response.data; }
		else { return this.parseResult(response.data); }
	};

	$jump = async (action, params, config = {}) => {
		const urlAction = this.parseURLAction(action, config.prefix);


		const paramsParsed = new URLSearchParams();

		Object.entries(params).forEach(([key, param]) =>
			paramsParsed.append(key, typeof param == 'object' ? JSON.stringify(param) : param)
		);


		window.location.href = `${urlAction}?${paramsParsed.toString()}`;
	};
}



export const aegis = new Aegis();
export const $get = aegis.$get.bind(aegis);
export const $post = aegis.$post.bind(aegis);
export const $jump = aegis.$jump.bind(aegis);
