import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Medico } from '../../models/medico';
import { MedicosProvider } from '../../providers/medicos/medicos';

@IonicPage()
@Component({
    selector: 'page-medicos-form',
    templateUrl: 'medicos-form.html',
})
export class MedicosFormPage {

    titulo = '';

    especialidades = '';

    medicoID = undefined;
    medico = new Medico();

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public medicoProvider: MedicosProvider,
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
    }

    salvar() {
        console.log(this.medico);

        if (this.medicoID) { // atualizar
            
            //this.medico.especialidades = this.medico.especialidades.split(', ');

            this.medicoProvider.atualizar(this.medicoID, this.medico).then(_ => {
                this.presentToast('Médico atualizado com sucesso!');
                this.navCtrl.pop();
            })

        } else { // inserir

            this.medicoProvider.inserir(this.medico).then(_ => {
                this.presentToast('Médico inserido com sucesso!');
                this.navCtrl.pop();
            });
        }
    }

    excluir() {
        const confirm = this.alertCtrl.create({
            title: 'Excluir?',
            message: 'Tem certeza que deseja excluir este médico?',
            buttons: [
                {
                    text: 'Não',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Excluir',
                    handler: () => {

                        this.medicoProvider.remover(this.medicoID)
                            .then(_ => {
                                console.log('ok')
                            })
                            .catch(error => {
                                console.log('error', error);
                            })

                    }
                }
            ]
        });
        confirm.present();
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
