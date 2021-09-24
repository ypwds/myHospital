import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { PacientesProvider } from '../../providers/pacientes/pacientes';

@IonicPage()
@Component({
    selector: 'page-pacientes-list',
    templateUrl: 'pacientes-list.html',
})
export class PacientesListPage {

    pacientes = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public pacientesProvider: PacientesProvider,
        public modalCtrl: ModalController
    ) {
        this.carregarLista();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PacientesListPage');
    }

    addItem() {
        this.navCtrl.push('PacientesFormPage');
    }

    editItem(item) {
        const pacienteID = item.key;
        const paciente = item.value;

        this.navCtrl.push('PacientesFormPage', { itemID: pacienteID, item: paciente });
    }

    detalhar(item) {
        console.log("Entrando na tela de detalhes...")
        console.log("Dados: ", item);

        this.navCtrl.push('PacientesDetalhesPage', { detalhe: item });
    }

    excluir(item) {
        const pacienteID = item.key;
        const confirm = this.alertCtrl.create({
            title: 'Excluir?',
            message: 'Tem certeza que deseja excluir este paciente?',
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

                        /* this.pacientesProvider.remover(pacienteID) */
                        this.pacientesProvider.removerFS(pacienteID)
                            .then(_ => {
                                console.log('ok');
                                this.presentToast('Paciente excluido com sucesso!');
                            })
                            .catch(error => {
                                console.log('error', error);
                            });

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
        const modal = this.modalCtrl.create('PacientesFilterPage');

        modal.onDidDismiss(_params => {
            if (_params !== undefined) {

                if (_params.isLimpar) {

                    console.log("isLimpar");
                    this.carregarLista();

                } else {

                    let cidade = _params.cidade;
                    let uf = _params.uf;
                    console.log("Estado: ", uf);
                    console.log("Cidade: ", cidade);

                    this.pacientesProvider.buscarFS(uf, cidade).subscribe(_data => {
                        console.log("Busca: ", _data);
                        this.pacientes = _data;
                    })

                }
            }
        });

        modal.present();
    }

    carregarLista() {
        /* this.pacientesProvider.listar().subscribe(_data => { */
        this.pacientesProvider.listarFS().subscribe(_data => {
            console.log(_data);
            this.pacientes = _data;
        });
    }

}
