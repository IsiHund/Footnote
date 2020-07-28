import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

/**
 * Provider with Angular-HttpClient
 */
@Injectable()
export class HttpAngularProvider {
    constructor(public http: HttpClient) { }

    public get(url: string, params?: any, options: any = {}) {
        return this.http.get(url, options);
    }

    public post(url: string, params: any, options: any = {}): Observable<any> {
        return this.http.post(url, params, options);
    }

    public put(url: string, params: any, options: any = {}): Observable<any> {
        return this.http.put(url, params, options);
    }

    public delete(url: string, params?: any, options: any = {}): Observable<any> {
        return this.http.delete(url, options);
    }
}