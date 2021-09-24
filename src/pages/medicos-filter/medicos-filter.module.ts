import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicosFilterPage } from './medicos-filter';

@NgModule({
  declarations: [
    MedicosFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicosFilterPage),
  ],
})
export class MedicosFilterPageModule {}
