import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddObjectPage } from './add-object'

@NgModule({
  declarations: [
    AddObjectPage,
  ],
  imports: [
    IonicPageModule.forChild(AddObjectPage)
  ],
})
export class AddObjectPageModule { }
