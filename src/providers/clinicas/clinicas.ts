import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ClinicasProvider {

    ENTIDADE = '/clinicas';

    constructor(public http: HttpClient, public afd: AngularFireDatabase) {
        console.log('Hello ClinicasProvider Provider');
    }

    listar() { //MODIFICA AINDA...
        return this.afd.list('/clinicas').valueChanges();
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
