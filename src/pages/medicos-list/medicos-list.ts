import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { MedicosProvider } from '../../providers/medicos/medicos';

@IonicPage()
@Component({
    selector: 'page-medicos-list',
    templateUrl: 'medicos-list.html',
})
export class MedicosListPage {

    medicos = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public medicoProvider: MedicosProvider,
        public modalCtrl: ModalController
    ) {
        this.medicoProvider.listar().subscribe(_data => {
            console.log(_data);
            this.medicos = _data;
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicosListPage');
    }

    addItem() {
        this.navCtrl.push('MedicosFormPage');
    }

    editItem(item) {
        const medicoID = item.key;
        const medico = item.value;

        this.navCtrl.push('MedicosFormPage', { itemID: medicoID, item: medico });
    }

    detalhar(item) {
        console.log("Entrando na tela de detalhes...")
        console.log("Dados: ", item);

        this.navCtrl.push('MedicosDetalhesPage', { detalhe: item });
    }

    excluir(item) {
        const medicoID = item.key;
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

                        this.medicoProvider.remover(medicoID)
                            .then(_ => {
                                console.log('ok');
                                this.presentToast('Médico excluido com sucesso!');
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

    openFilter() {
        const modal = this.modalCtrl.create('MedicosFilterPage');

        modal.onDidDismiss(_params => {
            if (_params !== undefined) {

                if (_params.isLimpar) {

                    console.log("isLimpar");
                    this.carregarLista();

                } else {

                    let especialidade = _params.especialidade;
                    console.log("Especialidade: ", especialidade);

                    this.medicoProvider.buscarFS(especialidade).subscribe(_data => {
                        console.log("Busca: ", _data);
                        this.medicos = _data;
                    })

                }
            }
        });

        modal.present();
    }

    carregarLista() {
        /* this.medicosProvider.listar().subscribe(_data => { */
        this.medicoProvider.listarFS().subscribe(_data => {
            console.log(_data);
            this.medicos = _data;
        });
    }

}
