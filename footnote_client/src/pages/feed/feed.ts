import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { _FeedPage } from '../_FeedPage';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';

/**
 * Page to choose Feed
 */
@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage extends _FeedPage {
  feeds;
  usergroup;
  /**
   * Constructor
   * @param navCtrl 
   * @param params 
   * @param rest 
   */
  constructor(public navCtrl: NavController, public params: NavParams, public rest: RestProvider) {
    super();
    this.usergroup = this.params.get('object');
  }

  ionViewDidEnter() {
    this.getUserGroups();
  }

  ionicViewDidLoad() {
    this.getUserGroups();
  }

  getUserGroups(): any {
    var id = this.usergroup.id;

    this.rest.getUserGroupFeeds(id).subscribe(data => {
      this.feeds = data;
    })
  }

  openModal(i) {
    this.navCtrl.push(HomePage, { id: this.feeds[i].id })
  }
}
