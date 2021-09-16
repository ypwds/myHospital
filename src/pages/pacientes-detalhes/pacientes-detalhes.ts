import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-pacientes-detalhes',
    templateUrl: 'pacientes-detalhes.html',
})
export class PacientesDetalhesPage {

    paciente;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PacientesDetalhesPage');


        let item = this.navParams.get('detalhe');

        console.log("PacientesDetalhesPage", item);

        this.paciente = item;
    }

}
