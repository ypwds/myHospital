import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserProvider {

    constructor(public http: HttpClient,
        public afd: AngularFireDatabase,
        public afa: AngularFireAuth) {
        console.log('Hello UserProvider Provider');
    }

    login() {

    }

    cadastro(usuario) {
        this.afa.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then(_usuarioAuth => {
                usuario.id = _usuarioAuth.uid;
                delete usuario.senha;

                this.salvarUser(usuario);
            }).catch(error => {
                console.log(error);  
                //Colocar um alerte...
            })
            ;
    }

    recuperarSenha() {

    }

    salvarUser(usuario) {
        this.afd.object('/usuarios/' + usuario.id).update(usuario);
    }

}
