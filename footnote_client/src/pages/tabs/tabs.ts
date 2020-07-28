import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import * as launcher from '../../assets/js/start_app';
import { AuthService } from '../../pages/auth/auth.service';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { NavProxyService } from '../../services/navProxy.service';
import { UserGroupSplitPage } from '../user-group-split/user-group-split';

/**
 * Page to show the Tabs
 */
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  home = HomePage;
  usergroup = UserGroupSplitPage;
  isAndroid;
  isIOS;
  id;

  /**
   * Constructor
   * @param navCtrl 
   * @param auth 
   * @param params 
   * @param platform 
   * @param navProxy 
   */
  constructor(public navCtrl: NavController, public auth: AuthService,
    public params: NavParams, public platform: Platform, public navProxy: NavProxyService) {
    this.id = { "id": this.params.get('id') };
  }

  /**
   * View did load
   */
  ionViewDidLoad() {
    this.isAndroid = this.platform.is('android')
    this.isIOS = this.platform.is("ios");
  }

  /**
   * open Vuforia with an App-Launcher
   */
  openVuforia() {
    launcher.packageLaunch("com.vuforia.Objects.intent.action.Vuforia", this.auth.getToken());
  }

  openWikitude() {
    WikitudePlugin.isDeviceSupported(
      function (success) {
        console.log("Your platform supports AR/Wikitude. Have fun developing!!");
        var startupConfiguration: any = { "camera_position": "back" };
        WikitudePlugin.loadARchitectWorld(
          function (success) {
            console.log("ARchitect World loaded successfully.");
            WikitudePlugin.callJavaScript("World.setToken('" + localStorage.getItem("token") + "')");
          },
          function (fail) {
            console.log("Failed to load ARchitect World!");
          },
          //          "www/assets/3_3dModels_1_3dModelOnTarget/index.html", // (1) if you have a IR (Image Recognition) World, use this
          //          ["ir"], // (1) if you have a IR (Image Recognition) World, use this
          "www/assets/wikitude_POI/index.html",  // (2) if you have a GeoLocation World, use this
          ["geo"],  // (2) if you have a GeoLocation World, use this
          // you find other samples or Wikitude worlds in Wikitude Cordova Plugin
          // which can be downloaded from here: https://github.com/Wikitude/wikitude-cordova-plugin/archive/v5.3.1-3.3.2.zip
          <JSON>startupConfiguration
        );
      },
      function (fail) {
        console.log("Your platform failed to run AR/Wikitude: " + fail);
      },
      [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
    );
  }

  /**
   * logout User
   */
  logout() {
    localStorage.removeItem("token");
    this.navCtrl.setRoot(LoginPage);
  }
}
