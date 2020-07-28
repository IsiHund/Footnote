import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, IonicPage, Platform, NavParams } from 'ionic-angular';
import { PlaceholderPage } from '../../pages/placeholder/placeholder';
import { NavProxyService } from '../../services/navProxy.service';
import { MasterPage } from '../master/master';

/**
 * Page to Split Master and Detail View
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Grab References to our 2 NavControllers...
  @ViewChild('detailNav') detailNav: Nav;
  @ViewChild('masterNav') masterNav: Nav;
  id;

  constructor(public navCtrl: NavController, public params: NavParams, public platform: Platform, public navProxy: NavProxyService) {
    platform.ready().then(() => {
      this.id = this.params.get('id');
      // Add our nav controllers to
      // the nav proxy service...
      navProxy.masterNav = this.masterNav;
      navProxy.detailNav = this.detailNav;
      // set initial pages for
      // our nav controllers...
      this.masterNav.setRoot(MasterPage,
        { detailNavCtrl: this.detailNav, "id": this.id });
      this.detailNav.setRoot(PlaceholderPage);
    });

  }
}
