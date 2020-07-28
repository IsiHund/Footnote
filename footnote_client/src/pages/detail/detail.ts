import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ViewController, IonicPage, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { AddInfoPage } from '../add-info/add-info';
import { _DetailPage } from '../_DetailPage';
import { HttpProvider } from '../../providers/http/http';

/**
 * Detail page
 * 
 * Page which shows the image, the title, the description and the notes
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage extends _DetailPage {
  /** Object which should be shown */
  object;
  /** ID of the usergroup */
  usergroupid: any;

  /**
   * Constructor
   * @param navCtrl 
   * @param platform 
   * @param params 
   * @param viewCtrl 
   * @param rest 
   * @param http 
   * @param modalCtrl 
   */
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public rest: RestProvider,
    public http: HttpProvider,
    public modalCtrl: ModalController
  ) {
    super();
    this.object = this.params.get('object');
    this.usergroupid = this.params.get('id');
  }

  /**
   * close this window
   */
  dismiss() {
    if (this.platform.is("android") || this.platform.is("ios")) {
      this.navCtrl.pop();
    }
  }

  /**
   * make this row editable
   * @param i 
   */
  edit(i: number) {
    this.object.notes[i].isEditable = true;
  }

  /**
   * Save the editet things to the server
   * @param i 
   */
  done(i: number) {
    this.object.notes[i].isEditable = false;
    var info = this.object.notes[i];
    delete info.isEditable;
    this.rest.editInfo(info).subscribe(data => {
      console.log("Info updated!");
    });
  }

  /**
   * Returns the Filepath
   * @param filename 
   */
  getFile(filename) {
    return this.http.url + "FileHandlerServlet?filename=" + filename;
  }

  /**
   * Delete Note
   * @param i 
   */
  delete(i: number) {
    this.object.notes[i].isEditable = false;
    var info = this.object.notes[i];
    delete info.isEditable;
    this.object.notes.splice(i, 1);
    this.rest.deleteInfo(this.object).subscribe(data => {
      console.log("gelöscht")
    });
  }

  /**
   * Open the add Note
   * @param i 
   */
  addNote(i: number) {
    let modal = this.modalCtrl.create(AddInfoPage, { info: this.object, id: this.usergroupid });
    modal.onDidDismiss(data => {
    })
    modal.present();
    console.log("add Note");
  }

  /**
   * Returns the imagepath
   * @param image 
   */
  getImage(image) {
    return this.http.url + "FileHandlerServlet?filename=" + image;
  }
}
