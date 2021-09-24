import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-medicos-filter',
    templateUrl: 'medicos-filter.html',
})
export class MedicosFilterPage {

    especialidade = '';
    especialidadeArr = [
        'Anestesiologia',
        'Cardiologia',
        'Cirurgia Geral',
        'Clínica Médica',
        'Dermatologia',
        'Gastroenterologia',
        'Geriatria'

    ];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicosFilterPage');
    }

    fechar() {
        this.viewCtrl.dismiss();
    }

    limpar() {
        const params = {
            especialidade: this.especialidade,
            isLimpar: true,
        };
        this.viewCtrl.dismiss(params);
    }

    filtrar() {
        const params = {
            especialidade: this.especialidade,
            isLimpar: false
        };
        this.viewCtrl.dismiss(params);
    }

}
