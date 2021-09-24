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

    //Funções do banco RealTime

    inserir(medico) {
        return this.afd.list(this.ENTIDADE).push(medico);
    }

    atualizar(id, medico) {
        return this.afd.object(this.ENTIDADE + '/' + id).update(medico);
    }

    remover(id) {
        return this.afd.object(this.ENTIDADE + '/' + id).remove();
    }

    buscar(especialidade: string) {
        return this.afd.list(this.ENTIDADE, ref => ref.orderByChild('especialidades').equalTo(especialidade))
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.key, value: changes.payload.val() })));
    }
    listar() {
        //return this.afd.list('/medicos').valueChanges();
        return this.afd.list(this.ENTIDADE)
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.key, value: changes.payload.val() })));
    }

    //Funções do Banco FireStore

    inserirFS(medico) {
        medico.status = true;
        const obj = JSON.parse(JSON.stringify(medico));
        const id = this.afs.createId();
        return this.afs.doc(this.ENTIDADE + '/' + id).set(obj);
    }

    atualizarFS(id, medico) {
        return this.afs.doc(this.ENTIDADE + '/' + id).update(medico);
    }

    removerFS(id) {
        return this.afs.doc(this.ENTIDADE + '/' + id).delete();
    }

    buscarFS(especialidade: string) {
        
        let medicos = [];
        
        console.log(especialidade);
        
        this.listarFS().subscribe(_data => {
            console.log("Médicos: ", _data);

            for (let i = 0; i < _data.length; i++) {
                for (let j = 0; j < _data[i].value.especialidades.length; j++) {
                    if(_data[i].value.especialidades[j] == especialidade){
                        //console.log('Entrei', _data[i]);
                        medicos.push(_data[i]);
                    }
                }
            }
        });

        //console.log("Médicos do Filtro: ", medicos);
        return medicos;
    }

    listarFS() {
        return this.afs.collection(this.ENTIDADE)
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.doc.id, value: changes.payload.doc.data() })));
    }

}
