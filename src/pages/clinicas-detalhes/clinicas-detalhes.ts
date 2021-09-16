import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-clinicas-detalhes',
    templateUrl: 'clinicas-detalhes.html',
})
export class ClinicasDetalhesPage {

    clinica;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClinicasDetalhesPage');

        let item = this.navParams.get('detalhe');

        console.log("ClinicasDetalhesPage", item);

        this.clinica = item;
    }
}
