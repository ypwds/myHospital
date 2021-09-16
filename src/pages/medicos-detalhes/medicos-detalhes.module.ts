import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicosDetalhesPage } from './medicos-detalhes';

@NgModule({
  declarations: [
    MedicosDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicosDetalhesPage),
  ],
})
export class MedicosDetalhesPageModule {}
