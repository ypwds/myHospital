import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Storage } from "@ionic/storage";

@Injectable()
export class UserProvider {

    constructor(public http: HttpClient,
        public afd: AngularFireDatabase,
        public afa: AngularFireAuth,
        public storage: Storage
    ) {
        console.log('Hello UserProvider Provider');
    }

    login(email, senha) {
        return this.afa.auth.signInWithEmailAndPassword(email, senha);
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

    recuperarSenha(email) {
        return this.afa.auth.sendPasswordResetEmail(email);
    }

    salvarUser(usuario) {
        this.afd.object('/usuarios/' + usuario.id).update(usuario);
    }

    byId(id: string) {
        /* console.log("Usuário: ", this.afd.object('/usuarios/' + id).valueChanges()); */
        return this.afd.object('/usuarios/' + id).valueChanges();
    }

    salvarLocal(id) {
        return this.storage.set('usuario', id);
    }

    lerLocal() {
        return this.storage.get('usuario');
    }

    removerLocal() {
        return this.storage.remove('usuario');
    }

}
