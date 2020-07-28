import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { AuthService } from '../../pages/auth/auth.service';

/**
 * Provider with Http-Native-Plugin
 */
@Injectable()
export class HttpNativeProvider {
    constructor(public http: HTTP, public auth: AuthService) { }

    public get(url: string, params?: any, options: any = {}) {
        //this.http.setDataSerializer('json');
        let responseData = this.http.get(url, params, this.getToken(url))
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data),
                err => console.log(err));

        return Observable.fromPromise(responseData);
    }

    public post(url: string, params?: any, options: any = {}): Observable<any> {
        if (!url.includes("FileHandlerServlet")) {
            this.http.setDataSerializer('json');
            let responseData = this.http.post(url, params, this.getToken(url))
                .then(resp =>
                    options.responseType == 'text' ? resp.data : JSON.parse(resp.data),
                    err => console.log(err)
                );

            return Observable.fromPromise(responseData);
        }
        else {
            this.http.setDataSerializer('utf8')
            let responseData = this.http.post(url, params, { 'Authorization': 'Bearer ' + this.auth.getToken() }).then(resp =>
                options.responseType == 'text' ? resp.data : JSON.parse(resp.data),
                err => console.log(err)
            );
            return Observable.fromPromise(responseData);
        }
    }

    public put(url: string, params?: any, options: any = {}): Observable<any> {
        this.http.setDataSerializer('json');
        let responseData = this.http.put(url, params, this.getToken(url))
            .then(resp =>
                options.responseType == 'text' ? resp.data : JSON.parse(resp.data),
                err => console.log(err)
            );
        return Observable.fromPromise(responseData);
    }

    public delete(url: string, params?: any, options: any = {}): Observable<any> {
        this.http.setDataSerializer('json');
        let responseData = this.http.delete(url, params, this.getToken(url))
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data),
                err => console.log(err));

        return Observable.fromPromise(responseData);
    }

    getToken(url) {
        if (this.auth.getToken() != null && !url.includes("rest/auth") && !url.includes("rest/json") && !url.includes("rest/user/register")) {
            return { "Authorization": `Bearer ${this.auth.getToken()}` }
        }
        else {
            return {};
        }
    }
}