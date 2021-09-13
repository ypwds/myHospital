import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-cadastro-usuario',
    templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

    nome = '';
    email = '';
    senha = '';

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public userProvider: UserProvider,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CadastroUsuarioPage');
    }

    cadastrar() {

        const loader = this.loadingCtrl.create({
            content: "Aguarde...",
        });
        loader.present();

        console.log("Cadastrando....");
        console.log("Nome: ", this.nome);
        console.log("E-mail: ", this.email);
        console.log("Senha: ", this.senha);

        let usuario = {
            nome: this.nome,
            email: this.email,
            senha: this.senha,
        }

        //this.userProvider.salvarUser(usuario);
        this.userProvider.cadastro(usuario);
        loader.dismiss();
        this.showAlert();

    }

    showAlert() {
        const alert = this.alertCtrl.create({
            title: 'Sucesso!',
            subTitle: 'Cadastro realizado com sucesso!',
            buttons: [
                {
                    text: 'Ok',
                    handler: data => {
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    }

}
