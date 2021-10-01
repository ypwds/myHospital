import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;

@IonicPage()
@Component({
    selector: 'page-clinicas-detalhes',
    templateUrl: 'clinicas-detalhes.html',
})
export class ClinicasDetalhesPage {

    @ViewChild('map') mapElement: ElementRef;
    map;

    clinica;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad ClinicasDetalhesPage');

        let item = this.navParams.get('detalhe');

        console.log("ClinicasDetalhesPage", item);

        this.clinica = item;

        console.log(this.clinica.value.lat, this.clinica.value.lng);

        this.map = this.criarMapa(this.mapElement);
        let marcador = this.addMarcador(this.clinica.value.lat, this.clinica.value.lng, this.clinica.value.nome, this.clinica.value.nome[0]);
        marcador.setMap(this.map);
    }

    criarMapa(mapElement) {
        if (mapElement !== null && mapElement.nativeElement !== null && google) {

            let options = {
                zoom: 15,
                center: { lat: this.clinica.value.lat, lng: this.clinica.value.lng },
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
            icon: new google.maps.MarkerImage(
                'https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1&text=' + abrev
            )
        });
    }

}
