import Axios from 'axios';

import { copyJSON } from '@nuogz/utility';

import { T } from './i18n.lib.js';



/** @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig */
/** @typedef {import('../bases.d.ts').AegisRequestConfig} AegisRequestConfig */
/** @typedef {import('../bases.d.ts').AegisGet} AegisGet */
/** @typedef {import('../bases.d.ts').AegisPost} AegisPost */
/** @typedef {import('../bases.d.ts').AegisJump} AegisJump */
/** @typedef {import('../bases.d.ts').AegisOpen} AegisOpen */



export default class Aegis {
	static alert = (message, title) => window.alert((title ? title + ':\n' : '') + message);

	/** @type {Function|typeof Aegis.alert} */
	alert = Aegis.alert;

	/** @type {string} */
	prefixDefault = './api';


	/**
	 * @param {Function} alert
	 * @param {string} [prefixDefault]
	 */
	constructor(alert, prefixDefault) {
		if(alert) { this.alert = alert; }
		if(prefixDefault) { this.prefixDefault = prefixDefault; }
	}


	/**
	 * @param {string} action
	 * @param {string} [prefix]
	 * @returns {string}
	 */
	parseURLAction = (action, prefix = this.prefixDefault) => {
		return `${prefix}${prefix.endsWith('/') ? '' : '/'}${action}`;
	};

	/**
	 * @param {Object} result
	 * @param {Function} [alert]
	 * @param {boolean} [willAlertFailedAsync=false]
	 */
	parseResult = async (result, alert, willAlertFailedAsync = false) => {
		if(result.success) {
			if(result.message && alert) {
				if(willAlertFailedAsync) {
					await alert(result.message, result.messageTitle, result);
				}
				else {
					alert(result.message, result.messageTitle, result);
				}
			}

			return result.data;
		}
		else {
			throw result.message || T('request-failed');
		}
	};


	/** @type {AegisGet} */
	$get = async (action, params, config = {}) => {
		/** @type {AxiosRequestConfig & AegisRequestConfig} */
		const configRequest = copyJSON(Object.assign({ params }, config));


		const urlAction = this.parseURLAction(action, configRequest.prefix);
		delete configRequest.prefix;

		const typeReturn = configRequest.return ?? 'data-parsed';
		delete configRequest.return;


		const response = await Axios.get(urlAction, configRequest);


		if(typeReturn == 'response') { return response; }
		if(typeReturn == 'raw') { return response.data; }
		else { return this.parseResult(response.data, config.willAlertFailed ? config.alert ?? this.alert : null, config.willAlertFailedAsync); }
	};

	/** @type {AegisPost} */
	$post = async (action, params, config = {}) => {
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
		else { return this.parseResult(response.data, config.willAlertFailed ? config.alert ?? this.alert : null, config.willAlertFailedAsync); }
	};

	/** @type {AegisJump} */
	$jump = async (action, params, config = {}) => {
		const urlAction = this.parseURLAction(action, config.prefix);


		const paramsParsed = new URLSearchParams();

		Object.entries(params).forEach(([key, param]) =>
			paramsParsed.append(key, typeof param == 'object' ? JSON.stringify(param) : param)
		);


		window.location.href = `${urlAction}?${paramsParsed.toString()}`;
	};
	/** @type {AegisOpen} */
	$open = async (action, params, config = {}) => {
		const urlAction = this.parseURLAction(action, config.prefix);


		const paramsParsed = new URLSearchParams();

		Object.entries(params).forEach(([key, param]) =>
			paramsParsed.append(key, typeof param == 'object' ? JSON.stringify(param) : param)
		);


		window.open(`${urlAction}?${paramsParsed.toString()}`, config.target, config.features);
	};
}



export const aegis = new Aegis();

/** @type {AegisGet} */
export const $get = aegis.$get.bind(aegis);
/** @type {AegisPost} */
export const $post = aegis.$post.bind(aegis);
/** @type {AegisJump} */
export const $jump = aegis.$jump.bind(aegis);
/** @type {AegisOpen} */
export const $open = aegis.$open.bind(aegis);
