import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DadosProvider {

    temp: String;

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

        return this.http.get('assets/db/Estados.json').toPromise().then(_data => {
            let estados = [];
            Object.keys(_data).map(index => {
                estados.push(_data[index]);
            });
            console.log("Dados recebidos: ", estados);
            return estados;
        });


    }

    listarCidades(sigla: string) {
        let cidades = [];
        return this.http.get('assets/db/Cidades.json').toPromise().then(_data => {
            return this.http.get('assets/db/Estados.json').toPromise().then(_estados => {
                let estados = {};
                Object.keys(_estados).map(index => {
                    estados[_estados[index].ID] = _estados[index].Sigla;
                });
                Object.keys(_data).map(index => {
                    const estadoCidadeID = _data[index].Estado;
                    if (estados[estadoCidadeID] == sigla){
                        cidades.push(_data[index].Nome);
                    }
                });
                console.log("Dados das Cidades recebidos", cidades);
                return cidades;

            });
        });

    }

}
