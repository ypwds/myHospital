import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ClinicasProvider {

    ENTIDADE = '/clinicas';

    constructor(
        public http: HttpClient,
        public afd: AngularFireDatabase,
        public afs: AngularFirestore
    ) {
        console.log('Hello ClinicasProvider Provider');
    }

    listar() { //Banco de Dados do RealTime
        //return this.afd.list('/clinicas').valueChanges();
        return this.afd.list(this.ENTIDADE)
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.key, value: changes.payload.val() })));
    }

    listarFS() { //Banco de Dados do FireStore
        return this.afs.collection(this.ENTIDADE)
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.doc.id, value: changes.payload.doc.data() })));
    }

    buscar(cidade: string) { //Editar RealTime
        return this.afd.list(this.ENTIDADE, ref => ref.orderByChild('cidade').equalTo(cidade))
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.key, value: changes.payload.val() })));
    }

    buscarFS(uf: string, cidade: string) { //Editar FireStore
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

    inserir(clinica) { //Banco de Dados do RealTime
        return this.afd.list(this.ENTIDADE).push(clinica);
    }

    inserirFS(clinica) { //Banco de Dados - FireStore
        const obj = JSON.parse(JSON.stringify(clinica));
        const id = this.afs.createId();
        return this.afs.doc(this.ENTIDADE + '/' + id).set(obj);
    }

    atualizar(id, clinica) { //Banco de Dados do RealTime
        return this.afd.object(this.ENTIDADE + '/' + id).update(clinica);
    }

    atualizarFS(id, clinica) { //Banco de Dados - FireStore
        return this.afs.doc(this.ENTIDADE + '/' + id).update(clinica);
    }

    remover(id) { //Banco de Dados do RealTime
        return this.afd.object(this.ENTIDADE + '/' + id).remove();
    }

    removerFS(id) { //Banco de Dados - FireStore
        return this.afs.doc(this.ENTIDADE + '/' + id).delete();
    }

}
