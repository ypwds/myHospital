import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicasFilterPage } from './clinicas-filter';

@NgModule({
  declarations: [
    ClinicasFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicasFilterPage),
  ],
})
export class ClinicasFilterPageModule {}
