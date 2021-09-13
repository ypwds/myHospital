import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    email = "";
    senha = "";

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    entrar() {
        this.email;
        this.senha;
        console.log("Entrando...");
    }

    cadastrarUsuario() { //Abrir a tela de cadastro de usuário
        this.navCtrl.push('CadastroUsuarioPage');
        console.log("Cadastrando...");
    }

    recuperarSenha() { //Abrir a tela de recuperação de senha do usuário
        this.navCtrl.push('RecuperarSenhaPage');
        console.log("Recuperando senha....");
    }

}
