/**
 * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
 */
/**
 * @typedef {Object} AegisRequestConfig
 * @property {string} [prefix]
 */
/**
 * @callback AegisGet
 * @param {string} action
 * @param {Object} [params]
 * @param {AxiosRequestConfig & AegisRequestConfig} [config={}]
 * @returns {Promise<any|AxiosResponse>}
 */
/**
 * @callback AegisPost
 * @param {string} action
 * @param {Object} [params]
 * @param {AxiosRequestConfig & AegisRequestConfig} [config={}]
 * @param {boolean} [alertUnSuccess=false]
 * @returns {Promise<any|AxiosResponse>}
 */
/**
 * @callback AegisJump
 * @param {string} action
 * @param {Object} [params]
 * @param {Object} [config={}]
 * @returns {Promise<void>}
 */
/**
 * @callback AegisOpen
 * @param {string} action
 * @param {Object} [params]
 * @param {Object} [config={}]
 * @returns {Promise<void>}
 */
export default class Aegis {
    static alert: (message: any, title: any) => void;
    /**
     * @param {Function} alert
     * @param {string} [prefixDefault]
     */
    constructor(alert: Function, prefixDefault?: string);
    /** @type {Function|typeof Aegis.alert} */
    alert: Function | ((message: any, title: any) => void);
    /** @type {string} */
    prefixDefault: string;
    /**
     * @param {string} action
     * @param {string} [prefix]
     * @returns {string}
     */
    parseURLAction: (action: string, prefix?: string) => string;
    /**
     * @param {Object} result
     */
    parseResult: (result: any) => Promise<any>;
    /** @type {AegisGet} */
    $get: AegisGet;
    /** @type {AegisPost} */
    $post: AegisPost;
    /** @type {AegisJump} */
    $jump: AegisJump;
    /** @type {AegisOpen} */
    $open: AegisOpen;
}
export const aegis: Aegis;
/** @type {AegisGet} */
export const $get: AegisGet;
/** @type {AegisPost} */
export const $post: AegisPost;
/** @type {AegisJump} */
export const $jump: AegisJump;
/** @type {AegisOpen} */
export const $open: AegisOpen;
export type AxiosRequestConfig = import('axios').AxiosRequestConfig;
export type AegisRequestConfig = {
    prefix?: string;
};
export type AegisGet = (action: string, params?: any, config?: AxiosRequestConfig & AegisRequestConfig) => Promise<any | AxiosResponse>;
export type AegisPost = (action: string, params?: any, config?: AxiosRequestConfig & AegisRequestConfig, alertUnSuccess?: boolean) => Promise<any | AxiosResponse>;
export type AegisJump = (action: string, params?: any, config?: any) => Promise<void>;
export type AegisOpen = (action: string, params?: any, config?: any) => Promise<void>;
