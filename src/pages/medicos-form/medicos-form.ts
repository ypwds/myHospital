import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Medico } from '../../models/medico';
import { DadosProvider } from '../../providers/dados/dados';
import { MedicosProvider } from '../../providers/medicos/medicos';

@IonicPage()
@Component({
    selector: 'page-medicos-form',
    templateUrl: 'medicos-form.html',
})
export class MedicosFormPage {

    titulo = '';

    especialidades = [];

    //especialidades = '';

    medicoID = undefined;
    medico = new Medico();

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public medicoProvider: MedicosProvider,
        public dadosProvider: DadosProvider
    ) {
        const medicoID = this.navParams.get('itemID');
        const medico = this.navParams.get('item');

        console.log(medicoID);
        console.log(medico);

        if (medicoID) { // tem alunoID?
            this.medicoID = medicoID;
            this.medico = medico;

            this.titulo = 'Editar Médico';

        } else {
            this.medicoID = undefined;
            this.medico = new Medico();

            this.titulo = 'Novo Médico';
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicosFormPage');

        //Pegando as especialidades do .json
        this.especialidades = this.dadosProvider.pegarEspecialidades();
        console.log("Dados recebidos:", this.especialidades);
    }

    salvar() {
        console.log(this.medico);

        if (this.medicoID) { // atualizar

            /* this.medicoProvider.atualizar(this.medicoID, this.medico).then(_ => { */
            this.medicoProvider.atualizarFS(this.medicoID, this.medico).then(_ => {
                this.presentToast('Médico atualizado com sucesso!');
                this.navCtrl.pop();
            })

        } else { // inserir
            this.medico.status = true; //setando o status do médico para true.

            /* this.medicoProvider.inserir(this.medico).then(_ => { */
                this.medicoProvider.inserirFS(this.medico).then(_ => {
                this.presentToast('Médico inserido com sucesso!');
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

}
