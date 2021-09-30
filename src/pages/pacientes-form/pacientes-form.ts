import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Paciente } from '../../models/paciente';
import { DadosProvider } from '../../providers/dados/dados';
import { PacientesProvider } from '../../providers/pacientes/pacientes';

@IonicPage()
@Component({
    selector: 'page-pacientes-form',
    templateUrl: 'pacientes-form.html',
})
export class PacientesFormPage {

    titulo = '';  //Mudança de Títudo para quando for atualizar ou adicionar
    estados = []; //Salvar os estados recebidos do Json
    cidades = []; //Salvar as cidades recebidos do Json de acordo com o estado selecionado
    showCity; //fazer aparece o campo de cidade quando o estado for selecionado.

    pacienteID = undefined;
    paciente = new Paciente();

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public pacientesProvider: PacientesProvider,
        public dadosProvider: DadosProvider,
    ) {
        //Configuração da Página de Atualizar e Adicionar
        const pacienteID = this.navParams.get('itemID');
        const paciente = this.navParams.get('item');

        console.log(pacienteID);
        console.log(paciente);

        if (pacienteID) { // tem pacienteID?

            this.pacienteID = pacienteID;
            this.paciente = paciente;

            this.titulo = 'Editar Paciente';

            this.selecionado();

        } else {
            this.showCity = false;
            this.pacienteID = undefined;
            this.paciente = new Paciente();

            this.titulo = 'Novo Paciente';
        }
    }



    ionViewDidLoad() {
        console.log('ionViewDidLoad PacientesFormPage');
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
        console.log(this.paciente);
        /* this.paciente.status = true;
        console.log(this.paciente);
        this.pacientesProvider.inserir(this.paciente); */

        if (this.pacienteID) { // atualizar

            /* this.pacientesProvider.atualizar(this.pacienteID, this.paciente).then(_ => { */
            this.pacientesProvider.atualizarFS(this.pacienteID, this.paciente).then(_ => {
                this.presentToast('Paciente atualizado com sucesso!');
                this.navCtrl.pop();
            });

        } else { // inserir
            this.paciente.status = true;  //setando o status do paciente para true.

            /* this.pacientesProvider.inserir(this.paciente).then(_ => { */
            this.pacientesProvider.inserirFS(this.paciente).then(_ => {
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

    selecionado() {
        this.showCity = true;

        console.log("O Estado é: ", this.paciente.uf);

        //Listando Cidades
        new Promise((resolve, reject) => {
            this.dadosProvider.listarCidades(this.paciente.uf).then(_data => {
                this.cidades = _data;
                resolve(true);
            }).catch(() => {
                resolve(false);
            });
        })

    }

}
