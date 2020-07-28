import { Component } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { NavController, NavParams, ViewController, ModalController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DialogPage } from '../dialog/dialog';
import { HttpProvider } from '../../providers/http/http';
import { _DetailPage } from '../_DetailPage';
import { TabsPage } from '../tabs/tabs';

/**
 * Page to add Objects
 */
@Component({
  selector: 'page-add-object',
  templateUrl: 'add-object.html',
})
export class AddObjectPage extends _DetailPage {
  object;
  newContent;
  detail;
  usergroupid;
  lat;
  long;

  /**
   * Constructor
   * @param camera 
   * @param geolocation 
   * @param navCtrl 
   * @param params 
   * @param http 
   * @param rest 
   * @param viewCtrl 
   * @param modalCtrl 
   */
  constructor(private geolocation: Geolocation, public navCtrl: NavController,
    public params: NavParams, public http: HttpProvider, public rest: RestProvider,
    public viewCtrl: ViewController, public modalCtrl: ModalController, private platform: Platform) {
    super();
    this.usergroupid = { "id": this.params.get('id') };

    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;

      }).catch((error) => {
        console.log('Error getting location', error);
      });
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        this.lat = data.coords.latitude;
        this.long = data.coords.longitude;
      });
    })
  }

  /**
   * Save Info
   */
  done() {
    var obj;
    obj = { "name": this.newContent, "description": this.detail, "longitude": this.long, "latitude": this.lat };
    this.insertObject(obj);
  }

  /**
   * insert Object
   * 
   * If insert was sucessful then open a Dialog-Page for uploading a Image
   * @param obj 
   */
  insertObject(obj) {
    this.rest.insertObject(obj).subscribe(data => {
      console.log("Object inserted!" + data + "id:" + data.id);
      this.http.presentToast("Objekt gespeichert!");
      this.openUploadDialog(data.id);
    }, (err) => {
      this.http.presentToast("Error");
    });

  }

  /**
   * close this window
   */
  dismiss() {
    this.navCtrl.setRoot(TabsPage, this.usergroupid);
  }

  /**
   * Open the File Upload Window
   */
  public openUploadDialog(id) {
    let modal = this.modalCtrl.create(DialogPage, { id: id, typ: "realobjectid", usergroupid: this.usergroupid.id }, {});
    modal.onDidDismiss(data => {
      this.dismiss();
    })
    modal.present();
  }
}