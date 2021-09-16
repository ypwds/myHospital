import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Paciente } from '../../models/paciente';
import { PacientesProvider } from '../../providers/pacientes/pacientes';

@IonicPage()
@Component({
    selector: 'page-pacientes-form',
    templateUrl: 'pacientes-form.html',
})
export class PacientesFormPage {

    titulo = '';

    pacienteID = undefined;
    paciente = new Paciente();

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public pacientesProvider: PacientesProvider,
    ) {
        const pacienteID = this.navParams.get('itemID');
        const paciente = this.navParams.get('item');

        console.log(pacienteID);
        console.log(paciente);

        if (pacienteID) { // tem pacienteID?
            this.pacienteID = pacienteID;
            this.paciente = paciente;

            this.titulo = 'Editar Paciente';

        } else {
            this.pacienteID = undefined;
            this.paciente = new Paciente();

            this.titulo = 'Novo Paciente';
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PacientesFormPage');
    }

    salvar() {
        /* this.paciente.status = true;
        console.log(this.paciente);
        this.pacientesProvider.inserir(this.paciente); */

        if (this.pacienteID) { // atualizar

            this.pacientesProvider.atualizar(this.pacienteID, this.paciente).then(_ => {
                this.presentToast('Paciente atualizado com sucesso!');
                this.navCtrl.pop();
            })

        } else { // inserir
            this.paciente.status = true;  //setando o status do paciente para true.

            this.pacientesProvider.inserir(this.paciente).then(_ => {
                this.presentToast('Paciente inserido com sucesso!');
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
