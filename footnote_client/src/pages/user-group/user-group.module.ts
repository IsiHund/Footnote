import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserGroupPage } from './user-group';

@NgModule({
  declarations: [
    UserGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(UserGroupPage),
  ],
})
export class UserGroupPageModule {}
