import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MedicosProvider {

    ENTIDADE = '/medicos';

    constructor(public http: HttpClient, public afd: AngularFireDatabase) {
        console.log('Hello MedicosProvider Provider');
    }

    listar() {
        //return this.afd.list('/medicos').valueChanges();
        return this.afd.list(this.ENTIDADE)
            .snapshotChanges()
            .map(item => item.map(changes => ({ key: changes.payload.key, value: changes.payload.val() })));
    }
    inserir(medico) {
        medico.status = true;
        medico.especialidades = medico.especialidades.split(', '); //salvando a esp. em array
        return this.afd.list(this.ENTIDADE).push(medico);
    }

    atualizar(id, medico) {
        medico.especialidades = medico.especialidades.split(', '); //atualizando a esp. em array
        return this.afd.object(this.ENTIDADE + '/' + id).update(medico);
    }

    remover(id) {
        return this.afd.object(this.ENTIDADE + '/' + id).remove();
    }

}
