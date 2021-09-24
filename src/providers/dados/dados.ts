import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

        this.http.get('assets/db/cidades-estados.json').toPromise().then(_data => {
            Object.keys(_data).map(idex => {
                estados.push(_data[idex]);
            });

        });

        return estados;

    }

    listarCidades(estado: string) { }

}
