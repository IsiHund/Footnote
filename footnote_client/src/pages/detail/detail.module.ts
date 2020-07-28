import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
import { ProgressBarModule } from "angular-progress-bar"

@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPage),
    ProgressBarModule
  ],
})
export class DetailPageModule { }
