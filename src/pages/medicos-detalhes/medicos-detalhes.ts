import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-medicos-detalhes',
    templateUrl: 'medicos-detalhes.html',
})
export class MedicosDetalhesPage {

    medico;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicosDetalhesPage');

        let item = this.navParams.get('detalhe');

        console.log("ClinicasDetalhesPage", item);

        this.medico = item;
    }

}
