import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpProvider } from '../http/http';
import { TabsPage } from '../../pages/tabs/tabs';
import { App } from 'ionic-angular';

/**
 * Provider for Rest-Requests
 */
@Injectable()
export class RestProvider {
  id;
  usergroupid: any;

  /**
   * Constructor
   * @param http 
   * @param app 
   * @param HTTP 
   */
  constructor(private http: HttpProvider, public app: App) {
  }

  /**
   * test server
   */
  json() {
    return this.http.http.get(this.http.url + 'rest/json', {}, { responseType: "json" })
  }

  /**
   * get Objects
   */
  getObjects() {
    return this.http.http.get(this.http.url + 'rest/realObject', {}, { responseType: "json" });
  }

  /**
   * save info
   * @param info 
   * @param id 
   */
  saveInfo(info, id) {
    return this.http.http.post(this.http.url + 'rest/note/insertNote/' + id, { "content": info }, { responseType: 'json' });
  }

  /**
   * edit info
   * @param info 
   */
  editInfo(info) {
    return this.http.http.post(this.http.url + 'rest/note', info, { responseType: 'text' });
  }

  /**
   * delete info
   * @param info 
   */
  deleteInfo(info) {
    return this.http.http.post(this.http.url + 'rest/realObject', info, { responseType: 'json' });
  }

  /**
   * edit Object
   * @param object 
   */
  editObject(object) {
    return this.http.http.post(this.http.url + 'rest/realObject', object, { responseType: 'text' });
  }

  /**
   * delete Object
   * @param object 
   */
  deleteObject(object) {
    return this.http.http.delete(this.http.url + 'rest/realObject/' + object, {}, { responseType: 'json' });
  }

  /**
   * insert Object
   * @param obj 
   */
  insertObject(obj) {
    return this.http.http.put(this.http.url + 'rest/realObject', obj, { responseType: 'json' });
  }

  /**
   * get Notes of Objects
   * @param id 
   */
  getObjectsNotes(id) {
    return this.http.http.get(this.http.url + 'rest/realObject/getObjectsNotes/' + id, {}, { responseType: "json" });
  }

  /**
   * get File with Path
   * @param image 
   */
  getFileWithPath(image) {
    return this.http.http.get(this.http.url + "FileHandlerServlet?filename=" + image, {}, {});
  }

  /**
   * upload Image
   * @param blob 
   * @param filename 
   */
  uploadFile(url, blob, params) {
    return this.http.http.post(url, blob, { responseType: "json", params });
  }

  /**
   * post new Target on Vuforia
   * @param json 
   */
  postNewTarget(json) {
    return this.http.http.post(this.http.url + "rest/realObject/postNewTarget", json, {});
  }

  /**
   * get Feeds by Usergroup
   * @param id 
   */
  getFeedsPerUserGroup(id): any {
    return this.http.http.get(this.http.url + 'rest/realObjectFeed/findRealObjectFeedsbyUsergroup/' + id, {}, { responseType: "json" });
  }

  /**
   * get Usergroup
   * @param id 
   */
  getUserGroups(id): any {
    return this.http.http.get(this.http.url + 'rest/UserGroup/getUserGroupsbyUserid/' + id, {}, { responseType: "json" })
  }

  /**
   * get feed by usergroup
   * @param id 
   */
  getUserGroupFeeds(id): any {
    return this.http.http.get(this.http.url + 'rest/realObjectFeed/findRealObjectFeedsbyUsergroup/' + id, {}, { responseType: "json" })

  }

  /**
   * get Objects per feeed
   * @param id 
   */
  getObjectsPerFeed(id): any {
    return this.http.http.get(this.http.url + 'rest/realObject/findRealObjectbyFeed/' + id, {}, { responseType: "json" })
  }

  /**
   * get Token
   */
  public getToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * uploads an image
   */
  public upload(files, id, typ, usergroupid) {
    this.id = id;
    this.usergroupid = usergroupid

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var id = id;

      // create a http-post request and pass the form
      // tell it to report the upload progress

      var reader = new FileReader();

      reader.onload = (e) => {
        var dataURI = reader.result;
        console.log(dataURI);

        var url: string = this.http.url + "FileHandlerServlet?filename=" + file.name + "&" + typ + "=" + this.id;
        const params = new HttpParams()
          .set("filename", file.name)
          .set(typ, this.id);

        this.uploadFile(url, dataURI, params).subscribe(
          data => {
            this.http.presentToast("Bild auf Server hochgeladen");
            // If it is a realobject the image have to be uploaded in vuforia
            debugger;
            if (this.id > 0 && typ === "realobjectid") {
              var json = { "id": this.id, "targetname": file.name };

              this.postNewTarget(json).subscribe(data => {
                this.http.presentToast("Bild auf Vuforia hochgeladen");
              },
                error => {
                  this.http.presentToast("Beim hochladen auf Vuforia ist ein Fehler aufgetreten");
                });
            }
            this.app.getActiveNav().setRoot(TabsPage, this.id);
          },

          err => {
            this.http.presentToast("Fehler beim hochladen des Bildes!")
            this.app.getActiveNav().setRoot(TabsPage, this.id);
          }
        );
      }
      reader.readAsDataURL(file);
    }
  }
  getTokenHeader(url) {

    return { "Authorization": `Bearer ${this.getToken()}` }
  }
}