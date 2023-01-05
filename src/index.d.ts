export default class Aegis {
    static alert: (message: any, title: any) => void;
    /**
     * @param {Function} alert
     * @param {string} [prefixDefault]
     */
    constructor(alert: Function, prefixDefault?: string);
    /** @type {Function|Aegis.alert} */
    alert: Function | ((message: any, title: any) => void);
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
    /** @type {GetFunction} */
    $get: GetFunction;
    /** @type {PostFunction} */
    $post: PostFunction;
    /** @type {JumpFunction} */
    $jump: JumpFunction;
}
export const aegis: Aegis;
/** @type {GetFunction} */
export const $get: GetFunction;
/** @type {PostFunction} */
export const $post: PostFunction;
/** @type {JumpFunction} */
export const $jump: JumpFunction;
export type GetFunction = (action: string, params?: any, config?: any) => Promise<any>;
export type PostFunction = (action: string, params?: any, config?: any, alertUnSuccess?: boolean) => Promise<any>;
export type JumpFunction = (action: string, params?: any, config?: any) => Promise<void>;
