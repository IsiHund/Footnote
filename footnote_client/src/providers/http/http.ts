import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { HttpAngularProvider } from '../http-angular/http-angular';
import { HttpNativeProvider } from '../http-native/http-native';
import { ToastController } from 'ionic-angular';

/**
 * HttpProvider
 * 
 * When the Platform is Android or Ios then use the Http-Native-Provider otherwise use the Http-Angular-Provider
 */
@Injectable()
export class HttpProvider {
    public http: HttpNativeProvider | HttpAngularProvider;
    // url = 'http://localhost:8080/footnote/';
    url = 'https://vm68.htl-leonding.ac.at/javaendpoint/footnote/';

    /**
     * Constructor
     * @param toastCtrl 
     * @param platform 
     * @param angularHttp 
     * @param nativeHttp 
     */
    constructor(private toastCtrl: ToastController, private platform: Platform, private angularHttp: HttpAngularProvider, private nativeHttp: HttpNativeProvider) {
        console.log("android:" + this.platform.is('android'));
        console.log("ios:" + this.platform.is('ios'));

        this.http = this.platform.is('ios') || this.platform.is('android') ? this.nativeHttp : this.angularHttp;
    }

    /**
     * Present a Toast Message
     * @param mes Text to show
     */
    presentToast(mes) {
        let toast = this.toastCtrl.create({
            message: mes,
            duration: 3000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'x',
        });

        toast.present();
    }
}