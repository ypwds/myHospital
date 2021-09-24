import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../../models/estado';

@Injectable()
export class DadosProvider {

    constructor(public http: HttpClient) {
        console.log('Hello DadosProvider Provider');
    }

    pegarEspecialidades() {
        let especialidades = [];

        this.http.get('assets/db/especialidades.json').toPromise().then(_data => {
            //console.log("Recebendo as especialidades: ", _data);

            Object.keys(_data).map(idex => {
                especialidades.push(_data[idex]);
            });

        });

        //console.log(especialidades);

        return especialidades;
    }

    listarEstados() {
        let estados = [];

        return this.http.get<Estado[]>('assets/db/cidades-estados.json');

    }
    
    listarCidades(estado: string) { }

}
