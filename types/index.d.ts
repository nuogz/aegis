/** @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig */
/** @typedef {import('../bases.d.ts').AegisRequestConfig} AegisRequestConfig */
/** @typedef {import('../bases.d.ts').AegisGet} AegisGet */
/** @typedef {import('../bases.d.ts').AegisPost} AegisPost */
/** @typedef {import('../bases.d.ts').AegisJump} AegisJump */
/** @typedef {import('../bases.d.ts').AegisOpen} AegisOpen */
export default class Aegis {
    static alert: (message: any, title: any) => void;
    /**
     * @param {Function} alert
     * @param {string} [prefixDefault]
     */
    constructor(alert: Function, prefixDefault?: string | undefined);
    /** @type {Function|typeof Aegis.alert} */
    alert: Function | typeof Aegis.alert;
    /** @type {string} */
    prefixDefault: string;
    /**
     * @param {string} action
     * @param {string} [prefix]
     * @returns {string}
     */
    parseURLAction: (action: string, prefix?: string | undefined) => string;
    /**
     * @param {Object} result
     * @param {Function} [alert]
     * @param {boolean} [willAlertFailedAsync=false]
     */
    parseResult: (result: Object, alert?: Function | undefined, willAlertFailedAsync?: boolean | undefined) => Promise<any>;
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
export type AxiosRequestConfig = import("axios").AxiosRequestConfig;
export type AegisRequestConfig = import("../bases.d.ts").AegisRequestConfig;
export type AegisGet = import("../bases.d.ts").AegisGet;
export type AegisPost = import("../bases.d.ts").AegisPost;
export type AegisJump = import("../bases.d.ts").AegisJump;
export type AegisOpen = import("../bases.d.ts").AegisOpen;
