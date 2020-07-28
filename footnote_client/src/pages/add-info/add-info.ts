import { Component } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DialogPage } from '../dialog/dialog';
import { _DetailPage } from '../_DetailPage';
import { TabsPage } from '../tabs/tabs';

/**
 * Page to add Info-Pieces
 */
@Component({
  selector: 'page-add-info',
  templateUrl: 'add-info.html',
})
export class AddInfoPage extends _DetailPage {
  /** current object */
  object;
  /** new Content */
  newContent;
  /** User Group Id */
  usergroupid;

  /**
   * Constructor
   * 
   * @param navCtrl 
   * @param params 
   * @param rest 
   * @param modalCtrl 
   */
  constructor(public navCtrl: NavController, public params: NavParams, public rest: RestProvider,
    public modalCtrl: ModalController) {
    super();
    this.object = this.params.get('info');
    this.usergroupid = { "id": this.params.get('id') };
  }

  /**
   * Save Info
   */
  done() {
    this.rest.saveInfo(this.newContent, this.object.id).subscribe(data => {
      console.log("Info updated! id: " + data.id);
      this.openUploadDialog(data.id);
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
    let modal = this.modalCtrl.create(DialogPage, { id: id, typ: "noteid", usergroupid: this.usergroupid.id }, {});
    modal.onDidDismiss(data => {
      this.dismiss();
    })
    modal.present();
  }
}