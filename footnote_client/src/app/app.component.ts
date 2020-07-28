import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

/**
 * App-Component
 */
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;
    isApp = false;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp(statusBar, splashScreen);

        platform.ready().then(() => {

            this.isApp = document.URL.indexOf('http') !== 0;
            if (this.isApp) {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                statusBar.styleDefault();

                /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */
                WikitudePlugin._sdkKey = "RlnIchZW2mOGYOKruqxN8OH3x+FeyFIC8CluKQMtu9zzBHJ9P8mZTNeL+SX0VaO+ucui/5aThrU0zkR+RKH+b9iv/aQToVfaYvppLLMaq2PdaL2P6VXbOvXCs1Q9mGvbiJlEwd7TnWE4ZhmiwBEV/YIRmWy11Ry30MQTk96knj9TYWx0ZWRfX0bXDsDhpVXNlaH8n1AugfbEPPAMpZtyG6w/0ZcY91rx7R1DoTgvQpkxIYoU4o8rHN+BNAMHnCYM8G7wTQ06smWJ8J8GE+FRAaa+3hDvLi7MYtb8TZXlkmEpGoHi3aY6XEGAqHcAvcLCwXSHp1Gq4QqXOJ5epep5UMchE9dinKMOdjn+bxp8dOY+zzV1rYVox1Q+625hDsLbaOkjxNmiKZW9MZApUERs9phlUs7CHDcKa0a7OR/X9FI1lJh3Ws3T/n2ff3HpI3LeoUy3dX/gCmz8YEA25zkt8Mby/GqX3JGjSRbzOVpx1lgGiEI7EMqA14G1HbrflvY8N1EHMYpD4ibRhD8pvnVCZB55u0afgGFNY0++mOvqIv9uIQkKG2rzflUv20L++c/eLFzsB1h63HJK8vDd31APhq+/o60R0cLoJeDW6+xhEn0ERnYcDo2iRtQsORixNxhAIR/OkZNhfI0cC2ikDLZyGoVEGb56V2XaGPTYzu7ycb+UsPPM9opQS8Zg4crIR4Lgkf6pnpXccOPGW+8ZfoUp14byBt7F6kKP4QQtprihix1HoXnCRzgdJpLXdG/YNiLF";

                /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
                 * through the function below for the direction Ionic2 app --> Wikitude SDK 
                 * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
                 * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
                // set the function to be called, when a "communication" is indicated from the AR View  
                WikitudePlugin.setOnUrlInvokeCallback(function (url) {

                    // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
                    if (url.indexOf('captureScreen') > -1) {
                        WikitudePlugin.captureScreen(
                            (absoluteFilePath) => {
                                console.log("snapshot stored at:\n" + absoluteFilePath);

                                // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                                WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath + "');");
                            },
                            (errorMessage) => {
                                console.log(errorMessage);
                            },
                            true, null
                        );
                    } else {
                        alert(url + "not handled");
                    }
                });

                /**
                 * Define the generic ok callback
                 */
                WikitudePlugin.onWikitudeOK = function () {
                    console.log("Things went ok.");
                }

                /**
                 * Define the generic failure callback
                 */
                WikitudePlugin.onWikitudeError = function () {
                    console.log("Something went wrong");
                }

                // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
                // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
                //WikitudePlugin.setLocation(47, 13, 450, 1);

                // for Android only
                WikitudePlugin.setBackButtonCallback(
                    () => {
                        console.log("Back button has been pressed...");
                    }
                );

            }
        });


    }

    initializeApp(statusBar, splashScreen) {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
