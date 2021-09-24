import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DadosProvider } from '../../providers/dados/dados';

@IonicPage()
@Component({
    selector: 'page-medicos-filter',
    templateUrl: 'medicos-filter.html',
})
export class MedicosFilterPage {

    especialidades = [];  //Salvar o array para mostrar no select
    especialidade = '';   //Salvar a especialidade para filtrar

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public dadosProvider: DadosProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicosFilterPage');

        //Pegando as especialidades do .json
        this.especialidades = this.dadosProvider.pegarEspecialidades();
        console.log("Dados recebidos:", this.especialidades);
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
