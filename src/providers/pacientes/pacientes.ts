import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class PacientesProvider {

    ENTIDADE = '/pacientes';

    constructor(
        public http: HttpClient,
        public afd: AngularFireDatabase,
        public afs: AngularFirestore
    ) {
        console.log('Hello PacientesProvider Provider');
    }

    listar() {
        //return this.afd.list(this.ENTIDADE).valueChanges();
        return this.afd.list(this.ENTIDADE)
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.key, value: changes.payload.val() })));
    }

    listarFS() {
        return this.afs.collection(this.ENTIDADE)
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.doc.id, value: changes.payload.doc.data() })));
    }

    buscar(cidade: string) {
        return this.afd.list(this.ENTIDADE, ref => ref.orderByChild('cidade').equalTo(cidade))
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.key, value: changes.payload.val() })));
    }

    buscarFS(uf: string, cidade: string) {
        console.log(uf);
        console.log(cidade);

        return this.afs.collection(this.ENTIDADE,
            ref => ref
                .where('uf', '==', uf)
                .where('cidade', '==', cidade)
                .orderBy('nome')
        )
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.doc.id, value: changes.payload.doc.data() })));
    }

    inserir(paciente) { //Banco de Dados - RealTime
        //paciente.status = true;
        return this.afd.list(this.ENTIDADE).push(paciente);
    }

    inserirFS(paciente) { //Banco de Dados - FireStore
        const obj = JSON.parse(JSON.stringify(paciente));
        const id = this.afs.createId();
        return this.afs.doc(this.ENTIDADE + '/' + id).set(obj);
    }

    atualizar(id, paciente) {
        return this.afd.object(this.ENTIDADE + '/' + id).update(paciente);
    }

    atualizarFS(id, paciente) { //Banco de Dados - FireStore
        return this.afs.doc(this.ENTIDADE + '/' + id).update(paciente);
    }

    remover(id) {
        return this.afd.object(this.ENTIDADE + '/' + id).remove();
    }

    removerFS(id) { //Banco de Dados - FireStore
        return this.afs.doc(this.ENTIDADE + '/' + id).delete();
    }

}
