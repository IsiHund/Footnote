import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { _UserGroupPage } from '../_UserGroupPage';
import { RestProvider } from '../../providers/rest/rest';
import { FeedPage } from '../feed/feed';
import { NavProxyUserGroupService } from '../../services/navProxyUserGroup.service';

/**
 * Choose Usergroup
 */
@IonicPage()
@Component({
  selector: 'page-user-group',
  templateUrl: 'user-group.html',
})
export class UserGroupPage extends _UserGroupPage {
  userGroups;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, private navProxy: NavProxyUserGroupService) {
    super();
  }

  ionViewDidEnter() {
    this.getUserGroups();
  }
  ionicViewDidLoad() {
    this.getUserGroups();
  }
  getUserGroups(): any {
    var id = localStorage.getItem("id");

    this.rest.getUserGroups(id).subscribe(data => {
      this.userGroups = data;
    })
  }

  openModal(i) {
    this.navProxy.pushDetail(FeedPage, { object: this.userGroups[i] });
    //this.navCtrl.push(DetailPage, { object: this.objects[i] });
  }
}
