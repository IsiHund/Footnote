import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import 'rxjs/add/operator/map';

/**
 * Provider for Authentication
 */
@Injectable()
export class AuthProvider {

    /**
     * Constructor
     */
    constructor(public http: HttpProvider) {
    }

    /**
     * Login
     * 
     * Posts Username and Password
     */
    login(username, password) {
        return this.http.http.post(this.http.url + 'rest/auth/login', {
            email: username,
            password: password
        }, { responseType: "json" });
    }

    /**
     * Register user
     * 
     * @param user 
     */
    register(user) {
        return this.http.http.post(this.http.url + 'rest/user/register', user, { responseType: "json" })
    }

    /**
     * Is this token valid?
     * @param token 
     */
    reauthenticate(token) {
        return this.http.http.post(this.http.url + 'rest/auth/checkTokenExpiration', token, { responseType: "json" });
    }
}