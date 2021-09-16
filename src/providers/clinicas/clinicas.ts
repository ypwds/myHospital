import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ClinicasProvider {

    ENTIDADE = '/clinicas';

    constructor(public http: HttpClient, public afd: AngularFireDatabase) {
        console.log('Hello ClinicasProvider Provider');
    }

    listar() {
        //return this.afd.list('/clinicas').valueChanges();
        return this.afd.list(this.ENTIDADE)
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.key, value: changes.payload.val() })));
    }
    inserir(clinica) {
        return this.afd.list(this.ENTIDADE).push(clinica);
    }

    atualizar(id, clinica) {
        return this.afd.object(this.ENTIDADE + '/' + id).update(clinica);
    }

    remover(id) {
        return this.afd.object(this.ENTIDADE + '/' + id).remove();
    }

}
