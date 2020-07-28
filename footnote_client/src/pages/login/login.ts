import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { RestProvider } from '../../providers/rest/rest';
import { HttpProvider } from '../../providers/http/http';

/**
 * Page for Login
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    loading: any;
    username: string = "";
    password: string = "";

    /**
     * Konstruktor
     * @param navCtrl 
     * @param navParams 
     * @param loadingCtrl 
     * @param auth 
     * @param rest 
     * @param http 
     */
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public loadingCtrl: LoadingController, public auth: AuthProvider,
        public rest: RestProvider, public http: HttpProvider) {
    }

    /**
     * View Did Enter
     */
    ionViewDidEnter() {
        this.showLoader();
        var token = localStorage.getItem('token');
        if (typeof (token) !== 'undefined' && token != null) {
            console.log("authenticating with token: ", token);
            this.loading.dismiss();
            this.auth.reauthenticate({ "value": token }).subscribe(data => {
                if (data.value == "true" || data.value == true) {
                    // this.navCtrl.setRoot(TabsPage, { id: 0 });
                    this.navCtrl.insert(0, TabsPage, { id: 0 });
                    this.navCtrl.popToRoot();
                    this.http.presentToast("bereits eingeloggt");
                }
                else {
                    this.http.presentToast("Token abgelaufen! Du musst dich erneut anmelden.");
                }
            });
        } else {
            this.loading.dismiss();
        }
    }

    /**
     * Login
     */
    login() {
        this.showLoader();
        this.rest.json().subscribe(data => {
            console.log(data)
        });
        this.auth.login(this.username, this.password).subscribe(res => {
            this.loading.dismiss();
            console.log(res);

            if (res != null && res != 'null') {
                localStorage.setItem('token', res.token);
                localStorage.setItem('id', res.id);
                this.navCtrl.insert(0, TabsPage, { id: 0 });
                this.navCtrl.popToRoot();
            }
            else {
                this.http.presentToast("Login fehlgeschlagen!")
            }
        }, error => {
            this.loading.dismiss();
            this.http.presentToast("Login fehlgeschlagen");
        });
    }

    /**
     * Show Spinner
     */
    showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Authentifizieren...'
        });
        this.loading.present();
    }

    /**
     * Show Register Page
     */
    register() {
        this.navCtrl.setRoot(RegisterPage);
    }
}