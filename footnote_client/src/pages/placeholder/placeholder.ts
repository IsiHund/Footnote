import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Page as Placeholder when no Detail-Page is opened
 */

@IonicPage()
@Component({
  selector: 'page-placeholder',
  templateUrl: 'placeholder.html',
})
export class PlaceholderPage {

  /**
   * Constructor
   * @param navCtrl 
   * @param navParams 
   */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
