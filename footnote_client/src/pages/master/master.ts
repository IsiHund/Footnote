import { Component, ViewChild } from '@angular/core';
import { NavController, App, Platform, IonicPage, Content, ModalController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { DetailPage } from '../detail/detail';
import { AddObjectPage } from '../add-object/add-object';
import { HttpProvider } from '../../providers/http/http';
import { _MasterPage } from '../_MasterPage';
import { NavProxyService } from '../../services/navProxy.service';

/**
 * Page for overview over object
 */
@IonicPage()
@Component({
  selector: 'page-master',
  templateUrl: 'master.html',
})
export class MasterPage extends _MasterPage {
  @ViewChild(Content) _content: Content;
  isAndroid = false;
  objects: any;
  objectsToShow: any;
  errorMessage: string;
  usergroupid;

  constructor(public modalCtrl: ModalController, public params: NavParams, public navCtrl: NavController, public rest: RestProvider, public app: App,
    private platform: Platform, private http: HttpProvider, private navProxy: NavProxyService) {
    super();
    this.usergroupid = this.params.get('id');
  }

  /**
   * Open the detail page
   * @param i 
   */
  openModal(i) {
    this.navProxy.pushDetail(DetailPage, { object: this.objects[i], id: this.usergroupid });
  }

  ionViewDidLoad() {
    this.isAndroid = this.platform.is('android')
  }

  ionViewWillEnter() {
    if (this.usergroupid == undefined || this.usergroupid == 0) {
      this.getObjects();
    }
    else {
      this.getObjectsperUserGroup(this.usergroupid);
    }

    this.http.presentToast("Objekte geladen!")
  }

  /**
   * get Users by User Group
   * @param usergroupid 
   */
  getObjectsperUserGroup(usergroupid: number): any {
    this.rest.getObjectsPerFeed(usergroupid)
      .subscribe(
        objects => {
          this.setObjects(objects);
        },
        error => { this.objects = []; this.errorMessage = <any>error });
  }

  /**
   * Set the objects
   * @param objects 
   */
  setObjects(objects: any): any {
    debugger;
    this.objects = objects;
    this.objectsToShow = objects;
  }

  /**
   * get the Objects from the server
   */
  getObjects() {
    this.rest.getObjects()
      .subscribe(
        objects => {
          this.setObjects(objects);
        },
        error => { this.objects = []; this.errorMessage = <any>error });
  }

  /**
   * Search throug the list of objects
   * @param ev 
   */
  filterItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.objectsToShow = this.objects.filter(function (item) {
        return item.name.toLowerCase().includes(val.toLowerCase());
      });
    }
    else {
      this.objectsToShow = this.objects;
    }
  }

  /**
   * Insert New Object
   */
  addObject() {
    let modal = this.modalCtrl.create(AddObjectPage, { "id": this.usergroupid });
    modal.onDidDismiss(data => {
      this.getObjects();
    });
    modal.present();
  }

  /**
   * Returns the Imagepath
   * @param image 
   */
  getImage(image) {
    return this.http.url + "FileHandlerServlet?filename=" + image;
  }
  /**
   * make this row editable
   * @param i 
   */
  edit(i: number) {
    this.objectsToShow[i].isEditable = true;
  }

  /**
   * Save the edited things to the server
   * @param i 
   */
  done(i: number) {
    this.objectsToShow[i].isEditable = false;
    var objects = this.objects[i];
    delete this.objectsToShow[i].isEditable;
    this.rest.editObject(objects).subscribe(data => {
      this.http.presentToast("Objekt erfolgreich bearbeitet!");
    });
  }

  /**
   * Delete Objekt
   * @param i 
   */
  delete(i: number) {
    this.objects[i].isEditable = false;

    this.rest.deleteObject(this.objects[i].id).subscribe(data => {
      this.http.presentToast("gelöscht")
      this.getObjects();
    });
  }

}
