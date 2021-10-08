import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClinicasProvider } from '../../providers/clinicas/clinicas';
import { ExportProvider } from '../../providers/export/export';

declare var google: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('map') mapElement: ElementRef;
    map;

    clinicasArr = [];

    constructor(public navCtrl: NavController,
        public clinicaProvider: ClinicasProvider,
        public exportProvider: ExportProvider,
    ) { }

    ionViewDidLoad() {
        this.map = this.criarMap(this.mapElement);

        this.clinicaProvider.listarFS().subscribe(_data => {
            //console.log("Clínicas recebidas: ", _data);

            this.clinicasArr = _data;

            for (let i = 0; i < _data.length; i++) {
                const element = _data[i];

                let _lat = element.value.lat;
                let _lng = element.value.lng;
                let _local = element.value.nome;

                let itemMarcador = {
                    lat: _lat,
                    lng: _lng,
                    nome: _local,
                    abrev: _local[0]
                }

                //console.log(itemMarcador);

                this.carregarDadosMapa(itemMarcador);

            }
        });

        /*         let marcador = this.addMarcador(-7.606362949778678, -35.2305244098178);
                marcador.setMap(this.map); */
    }

    carregarDadosMapa(itemMarcador) {
        //Criar o marcador
        const marcador = this.addMarcador(itemMarcador.lat, itemMarcador.lng, itemMarcador.nome, itemMarcador.abrev);

        //criar nome do local ao clicar no marcador
        const infoClick = this.addNomeWindow(itemMarcador.nome);

        //evento de click no marcador
        marcador.addListener("click", () => {
            //abre o infoclick e associa ao macador
            infoClick.open({
                anchor: marcador,
                map: this.map
            });
        });

        marcador.setMap(this.map);
    }

    criarMap(mapElement) {
        if (mapElement !== null && mapElement.nativeElement !== null && google) {

            let options = {
                zoom: 7,
                center: { lat: -5.081357184675141, lng: -39.70482921223503 }
            };

            return new google.maps.Map(mapElement.nativeElement, options);
        } else {
            return undefined;
        }
    }

    addMarcador(_lat, _lng, nome, abrev) {
        return new google.maps.Marker({
            position: { lat: _lat, lng: _lng },
            title: nome,
            icon: new google.maps.MarkerImage('https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1&text=' + abrev),
        })
    }

    addNomeWindow(texto: string) {
        let contentHtml = `
          Local: ${texto}
        `;

        return new google.maps.InfoWindow({
            content: contentHtml
        })
    }

    gerarPDF() {
        this.exportProvider.gerarPDF(this.exportarDados(), 'Clinicas');
    }

    gerarExel() {
        this.exportProvider.gerarExcel(this.exportarDados(), 'Clinicas');
    }

    gerarCVS() {
        this.exportProvider.gerarCSV(this.exportarDados(), 'Clinicas');
    }

    private exportarDados() {
        let jsonArr = [];

        for (let i = 0; i < this.clinicasArr.length; i++) {
            const element = this.clinicasArr[i];

            //const key = element.key;
            const value = element.value;

            let _item = {
                'Cidade': value.cidade,
                'Endereço': value.endereco,
                'UF': value.uf,
                'Latitude': value.lat,
                'Longitude': value.lng,
                'Nome': value.nome,
                'Link': 'https://www.google.com/maps/?q=' + value.lat + ',' + value.lng,
            };

            jsonArr.push(_item);
        }

        return jsonArr;
    }

}
