import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DialogPage } from './dialog';
import {ProgressBarModule} from "angular-progress-bar"

@NgModule({
  declarations: [
    DialogPage,
  ],
  imports: [
    IonicPageModule.forChild(DialogPage),
    ProgressBarModule
  ],
})
export class DialogPageModule {}
