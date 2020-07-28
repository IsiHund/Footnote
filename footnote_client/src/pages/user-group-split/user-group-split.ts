import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, Platform } from 'ionic-angular';
import { NavProxyUserGroupService } from '../../services/navProxyUserGroup.service';
import { PlaceholderPage } from '../placeholder/placeholder';
import { UserGroupPage } from '../user-group/user-group';

/**
 * UserGroupSlitPage
 */
@IonicPage()
@Component({
  selector: 'page-user-group-split',
  templateUrl: 'user-group-split.html',
})
export class UserGroupSplitPage {
  // Grab References to our 2 NavControllers...
  @ViewChild('detailNav') detailNav: Nav;
  @ViewChild('masterNav') masterNav: Nav;

  constructor(public navCtrl: NavController, public platform: Platform, public navProxy: NavProxyUserGroupService) {
    platform.ready().then(() => {
      // Add our nav controllers to
      // the nav proxy service...
      navProxy.masterNav = this.masterNav;
      navProxy.detailNav = this.detailNav;
      // set initial pages for
      // our nav controllers...
      this.masterNav.setRoot(UserGroupPage,
        { detailNavCtrl: this.detailNav });
      this.detailNav.setRoot(PlaceholderPage);
    });
  }
}
