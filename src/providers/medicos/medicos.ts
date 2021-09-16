import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MedicosProvider {

    ENTIDADE = '/medicos';

    constructor(public http: HttpClient, public afd: AngularFireDatabase) {
        console.log('Hello MedicosProvider Provider');
    }

    listar() { //MODIFICA AINDA...
        return this.afd.list('/medicos').valueChanges();
    }
    inserir(medico) { 
        return this.afd.list(this.ENTIDADE).push(medico);
    }

    atualizar(id, medico) { 
        return this.afd.object(this.ENTIDADE + '/' + id).update(medico);
    }
    
    remover(id) {
        return this.afd.object(this.ENTIDADE + '/' + id).remove();
    }

}
