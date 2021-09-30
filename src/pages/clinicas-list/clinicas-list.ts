import { Component } from '@angular/core';
import { AlertController, IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ClinicasProvider } from '../../providers/clinicas/clinicas';

@IonicPage()
@Component({
    selector: 'page-clinicas-list',
    templateUrl: 'clinicas-list.html',
})
export class ClinicasListPage {

    clinicas = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public clinicasProvider: ClinicasProvider,
        public modalCtrl: ModalController
    ) {
        /* this.clinicasProvider.listar().subscribe(_data => {
            console.log(_data);
            this.clinicas = _data;
        }) */

        this.carregarLista();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClinicasListPage');
    }

    addItem() {
        this.navCtrl.push('ClinicasFormPage');
    }

    editItem(item) {
        const clinicaID = item.key;
        const clinica = item.value;

        this.navCtrl.push('ClinicasFormPage', { itemID: clinicaID, item: clinica });
    }

    detalhar(item) {
        console.log("Entrando na tela de detalhes...")
        console.log("Dados: ", item);

        this.navCtrl.push('ClinicasDetalhesPage', { detalhe: item });
    }

    excluir(item) {
        const clinicaID = item.key;
        const confirm = this.alertCtrl.create({
            title: 'Excluir?',
            message: 'Tem certeza que deseja excluir esta clínica?',
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

                        this.clinicasProvider.removerFS(clinicaID)
                            .then(_ => {
                                console.log('ok');
                                this.presentToast('Clínica excluido com sucesso!');
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
        const modal = this.modalCtrl.create('ClinicasFilterPage');

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

                    this.clinicasProvider.buscarFS(uf, cidade).subscribe(_data => {
                        console.log("Busca: ", _data);
                        this.clinicas = _data;
                    });

                }
            }
        });

        modal.present();
    }

    carregarLista() {
        /* this.clinicasProvider.listar().subscribe(_data => { */
        this.clinicasProvider.listarFS().subscribe(_data => {
            console.log(_data);
            this.clinicas = _data;
        });
    }

}
