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

    titulo = '';
    estados = [];
    cidades = [];

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

        } else {
            this.pacienteID = undefined;
            this.paciente = new Paciente();

            this.titulo = 'Novo Paciente';
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PacientesFormPage');
        //Listando Estados e Cidades
        const estadosArr = this.dadosProvider.listarEstados();


        console.log(typeof estadosArr);
        console.log(typeof this.estados);
        //console.log(estadosArr[0].cidades);

/*         for (let i = 0; i = estadosArr.length;) {
            for (let j = 0; j < estadosArr[0].length; j++) { 
                console.log("Estados Brasileiros: ",estadosArr[i].length);            
            }
        } */

        //console.log(this.estado);

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

}
