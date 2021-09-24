import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class MedicosProvider {

    ENTIDADE = '/medicos';

    constructor(
        public http: HttpClient,
        public afd: AngularFireDatabase,
        public afs: AngularFirestore
    ) {
        console.log('Hello MedicosProvider Provider');
    }

    listar() {
        //return this.afd.list('/medicos').valueChanges();
        return this.afd.list(this.ENTIDADE)
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.key, value: changes.payload.val() })));
    }

    listarFS() {
        return this.afs.collection(this.ENTIDADE)
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.doc.id, value: changes.payload.doc.data() })));
    }

    buscar(especialidade: string) { //Editar RealTime
        return this.afd.list(this.ENTIDADE, ref => ref.orderByChild('especialidades').equalTo(especialidade))
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.key, value: changes.payload.val() })));
    }

    buscarFS(especialidade: string) { //Editar FireStore
        console.log(especialidade);

        return this.afs.collection(this.ENTIDADE,
            ref => ref
                .where('especialidades', '==', especialidade)
                .orderBy('especialidades')
        )
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.doc.id, value: changes.payload.doc.data() })));
    }

    inserir(medico) {
        medico.status = true;
        return this.afd.list(this.ENTIDADE).push(medico);
    }

    inserirFS(medico) { //Banco de Dados - FireStore
        medico.status = true;
        const obj = JSON.parse(JSON.stringify(medico));
        const id = this.afs.createId();
        return this.afs.doc(this.ENTIDADE + '/' + id).set(obj);
    }

    atualizar(id, medico) {
        medico.especialidades = medico.especialidades.split(', '); //atualizando a esp. em array
        return this.afd.object(this.ENTIDADE + '/' + id).update(medico);
    }

    atualizarFS(id, medico) { //Banco de Dados - FireStore
        return this.afs.doc(this.ENTIDADE + '/' + id).update(medico);
    }

    remover(id) {
        return this.afd.object(this.ENTIDADE + '/' + id).remove();
    }
    removerFS(id) { //Banco de Dados - FireStore
        return this.afs.doc(this.ENTIDADE + '/' + id).delete();
    }

}
