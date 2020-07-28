import { Md5 } from 'ts-md5/dist/md5';
import { HttpProvider } from '../../providers/http/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email: string = "";
  password1: string = "";
  password2: string = "";
  firstname: string = "";
  lastname: string = "";
  salt = "salt";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public auth: AuthProvider, public http: HttpProvider) {
  }

  /**
   * Register User
   */
  register() {
    if (this.validateEmail(this.email) && this.password1 == this.password2) {
      var passwordhash = Md5.hashStr(this.password1 + this.salt);
      var user = { "firstname": this.firstname, "lastname": this.lastname, "email": this.email, "passwordhash": passwordhash, "passwordsalt": this.salt, "mobile": "068181", "role": "USER" };
      this.auth.register(user).subscribe(objects => {
        this.http.presentToast("Registrierung erfolgreich! Bitte Aktivierungslink in E-Mail klicken!");
        this.navCtrl.setRoot(LoginPage);
      }
      );
    }
    else {
      this.http.presentToast("E-Mail oder Passwort ist falsch!")
    }
  }

  /**
   * check this email
   */
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
