import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserGroupSplitPage } from './user-group-split';

@NgModule({
  declarations: [
    UserGroupSplitPage,
  ],
  imports: [
    IonicPageModule.forChild(UserGroupSplitPage),
  ],
})
export class UserGroupSplitPageModule {}
