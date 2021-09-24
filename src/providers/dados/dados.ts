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
            console.log("Recebendo as especialidades: ", _data);

            const dados = Object.keys(_data).map(idex => {
                especialidades.push(_data[idex]);
            });

        });

        return especialidades;
    }

}
