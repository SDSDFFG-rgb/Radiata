/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ModelListResponseModel
 */
export interface ModelListResponseModel {
    /**
     * 
     * @type {string}
     * @memberof ModelListResponseModel
     */
    status: string;
    /**
     * 
     * @type {string}
     * @memberof ModelListResponseModel
     */
    message?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ModelListResponseModel
     */
    data: Array<string>;
}

/**
 * Check if a given object implements the ModelListResponseModel interface.
 */
export function instanceOfModelListResponseModel(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function ModelListResponseModelFromJSON(json: any): ModelListResponseModel {
    return ModelListResponseModelFromJSONTyped(json, false);
}

export function ModelListResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelListResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': json['status'],
        'message': !exists(json, 'message') ? undefined : json['message'],
        'data': json['data'],
    };
}

export function ModelListResponseModelToJSON(value?: ModelListResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': value.status,
        'message': value.message,
        'data': value.data,
    };
}

