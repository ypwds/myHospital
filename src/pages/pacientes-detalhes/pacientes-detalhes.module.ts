import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacientesDetalhesPage } from './pacientes-detalhes';

@NgModule({
  declarations: [
    PacientesDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(PacientesDetalhesPage),
  ],
})
export class PacientesDetalhesPageModule {}
