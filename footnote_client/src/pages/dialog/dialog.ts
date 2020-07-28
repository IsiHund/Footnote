import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { HttpParams } from '@angular/common/http';
import { HttpProvider } from '../../providers/http/http';

/**
 * Dialog Page
 */
@IonicPage()
@Component({
  selector: 'page-dialog',
  templateUrl: 'dialog.html',
})
export class DialogPage {
  @ViewChild('file') file;

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  public files = [];
  id;
  typ;
  usergroupid

  /**
   * Constructor
   * @param navCtrl 
   * @param navParams 
   * @param viewCtrl 
   * @param rest 
   */
  constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public rest: RestProvider, private http: HttpProvider) {
    this.id = navParams.get("id");
    this.typ = navParams.get("typ");
    this.usergroupid = { "id": navParams.get("usergroupid") };
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.push(files[key]);
      }
    }
  }
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      console.log(base64Image);
      var url: string = this.http.url + "FileHandlerServlet?filename=" + this.id + ".jpg&" + this.typ + "=" + this.id;
      const params = new HttpParams()
        .set("filename", this.id + ".jpg")
        .set(this.typ, this.id);

      this.rest.uploadFile(url, base64Image, params).subscribe(data => {
        this.http.presentToast("Bild erfolgreich hochgeldaden");
      })
    }, (err) => {
      // Handle error
    });
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.rest.upload(this.files, this.id, this.typ, this.usergroupid);
  }

  dismiss() {
    this.viewCtrl.dismiss();
    //this.navCtrl.setRoot(HomePage, this.usergroupid);
  }
}
