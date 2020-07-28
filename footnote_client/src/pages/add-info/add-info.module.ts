import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInfoPage } from './add-info';

@NgModule({
  declarations: [
    AddInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddInfoPage),
  ],
})
export class AddInfoPageModule { }
