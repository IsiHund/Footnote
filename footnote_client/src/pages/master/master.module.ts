import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MasterPage } from './master';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    MasterPage,
  ],
  imports: [
    IonicPageModule.forChild(MasterPage),
    IonicImageLoader
  ],
})
export class MasterPageModule { }
