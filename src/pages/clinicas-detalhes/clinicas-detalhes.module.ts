import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicasDetalhesPage } from './clinicas-detalhes';

@NgModule({
  declarations: [
    ClinicasDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicasDetalhesPage),
  ],
})
export class ClinicasDetalhesPageModule {}
