import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Clinica } from '../../models/clinica';
import { ClinicasProvider } from '../../providers/clinicas/clinicas';

@IonicPage()
@Component({
    selector: 'page-clinicas-form',
    templateUrl: 'clinicas-form.html',
})
export class ClinicasFormPage {

    titulo = '';

    clinicaID = undefined;
    clinica = new Clinica();

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public clinicasProvider: ClinicasProvider,
    ) {
        const clinicaID = this.navParams.get('itemID');
        const clinica = this.navParams.get('item');

        console.log(clinicaID);
        console.log(clinica);

        if (clinicaID) { // tem clínicaID?
            this.clinicaID = clinicaID;
            this.clinica = clinica;

            this.titulo = 'Editar Clínica';

        } else {
            this.clinicaID = undefined;
            this.clinica = new Clinica();

            this.titulo = 'Novo Clínica';
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClinicasFormPage');
    }

    salvar() {
        /* this.clinica.status = true;
        console.log(this.clinica);
        this.clinicasProvider.inserir(this.clinica); */

        if (this.clinicaID) { // atualizar

            this.clinicasProvider.atualizar(this.clinicaID, this.clinica).then(_ => {
                this.presentToast('Clínica atualizado com sucesso!');
                this.navCtrl.pop();
            })

        } else { // inserir

            this.clinicasProvider.inserir(this.clinica).then(_ => {
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

}
