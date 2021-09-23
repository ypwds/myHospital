import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-pacientes-filter',
    templateUrl: 'pacientes-filter.html',
})
export class PacientesFilterPage {

    cidade = '';
    cidadeArr = [
        'Aliança',
        'Nazaré da Mata',
        'Carpina',
        'Recife',
        'Olinda',
        'Paulista',
        'Timbaúba'
    ];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PacientesFilterPage');
    }

    fechar() {
        this.viewCtrl.dismiss();
    }

    limpar() {
        const params = {
            cidade: this.cidade,
            isLimpar: true,
        };
        this.viewCtrl.dismiss(params);
    }

    filtrar() {
        const params = {
            cidade: this.cidade,
            isLimpar: false
        };
        this.viewCtrl.dismiss(params);
    }

}
