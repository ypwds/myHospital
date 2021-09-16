import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicosProvider } from '../../providers/medicos/medicos';

@IonicPage()
@Component({
    selector: 'page-medicos-list',
    templateUrl: 'medicos-list.html',
})
export class MedicosListPage {

    medicos = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public medicoProvider: MedicosProvider,
    ) {
        this.medicoProvider.listar().subscribe(_data => {
            console.log(_data);
            this.medicos = _data;
          })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MedicosListPage');
    }

    addItem() {
        this.navCtrl.push('MedicosFormPage');
    }

}
