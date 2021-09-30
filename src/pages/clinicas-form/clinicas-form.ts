import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Clinica } from '../../models/clinica';
import { ClinicasProvider } from '../../providers/clinicas/clinicas';
import { DadosProvider } from '../../providers/dados/dados';

@IonicPage()
@Component({
    selector: 'page-clinicas-form',
    templateUrl: 'clinicas-form.html',
})
export class ClinicasFormPage {

    estados = []; //Salvar os estados recebidos do Json
    cidades = []; //Salvar as cidades recebidos do Json de acordo com o estado selecionado
    showCity ; //fazer aparece o campo de cidade quando o estado for selecionado.

    titulo = ''; //Mudança de Títudo para quando for atualizar ou adicionar

    clinicaID = undefined;
    clinica = new Clinica();

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public clinicasProvider: ClinicasProvider,
        public dadosProvider: DadosProvider,
    ) {
        const clinicaID = this.navParams.get('itemID');
        const clinica = this.navParams.get('item');

        console.log(clinicaID);
        console.log(clinica);

        if (clinicaID) { // tem clínicaID?
            this.selecionado();
            this.clinicaID = clinicaID;
            this.clinica = clinica;

            this.titulo = 'Editar Clínica';

            this.selecionado();

        } else {
            this.showCity = false;
            this.clinicaID = undefined;
            this.clinica = new Clinica();

            this.titulo = 'Novo Clínica';
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClinicasFormPage');
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

    salvar() {
        /* this.clinica.status = true;
        console.log(this.clinica);
        this.clinicasProvider.inserir(this.clinica); */

        if (this.clinicaID) { // atualizar
            this.clinicasProvider.atualizarFS(this.clinicaID, this.clinica).then(_ => {
                this.showCity = true; //deveria funcionar
                this.presentToast('Clínica atualizado com sucesso!');
                this.navCtrl.pop();
            })

        } else { // inserir

            this.clinicasProvider.inserirFS(this.clinica).then(_ => {
                this.presentToast('Clínica inserido com sucesso!');
                this.navCtrl.pop();
            });
        }
    }

    presentToast(mensagem) {
        const toast = this.toastCtrl.create({
            message: mensagem,
            duration: 3000,
            position: 'position',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    }

    selecionado() {
        this.showCity = true;

        console.log("O Estado é: ", this.clinica.uf);

        //Listando Cidades
        new Promise((resolve, reject) => {
            this.dadosProvider.listarCidades(this.clinica.uf).then(_data => {
                this.cidades = _data;
                resolve(true);
            }).catch(() => {
                resolve(false);
            });
        })

    }

}
