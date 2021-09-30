import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DadosProvider } from '../../providers/dados/dados';

@IonicPage()
@Component({
    selector: 'page-pacientes-filter',
    templateUrl: 'pacientes-filter.html',
})
export class PacientesFilterPage {

    estados = []; //Salvar os estados recebidos do Json
    cidades = []; //Salvar as cidades recebidos do Json de acordo com o estado selecionado
    showCity = false; //fazer aparece o campo de cidade quando o estado for selecionado.

    cidade = '';
    uf = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public dadosProvider: DadosProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PacientesFilterPage');
    }

    ionViewCanEnter(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.dadosProvider.listarEstados().then(_data => {
                this.estados = _data;
                console.log(_data);
                resolve(true);
            }).catch(() => {
                resolve(false);
            });
        })
    }

    fechar() {
        this.viewCtrl.dismiss();
    }

    limpar() {
        const params = {
            uf: this.uf,
            cidade: this.cidade,
            isLimpar: true,
        };
        this.viewCtrl.dismiss(params);
    }

    filtrar() {
        const params = {
            uf: this.uf,
            cidade: this.cidade,
            isLimpar: false
        };
        this.viewCtrl.dismiss(params);
    }

    selecionado() {
        this.showCity = true;

        console.log("O Estado selecionado é: ", this.uf);

        //Listando Cidades
        new Promise((resolve, reject) => {
            this.dadosProvider.listarCidades(this.uf).then(_data => {
                this.cidades = _data;
                resolve(true);
            }).catch(() => {
                resolve(false);
            });
        })

    }

}
