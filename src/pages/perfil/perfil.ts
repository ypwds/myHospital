import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { FirebaseStorageProvider } from '../../providers/firebase-storage/firebase-storage';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-perfil',
    templateUrl: 'perfil.html',
})
export class PerfilPage {

    @ViewChild('fileUserPhoto') fileUserPhoto;

    perfil = new User();
    foto = "../../assets/imgs/userFoto.png";
    isUploaded = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public usuarioProvider: UserProvider,
        public fireStorageProvider: FirebaseStorageProvider,
        public loadingCtrl: LoadingController,
    ) {
    }

    ionViewDidLoad() {
/*         console.log('ionViewDidLoad PerfilPage');

        const loader = this.loadingCtrl.create({
            content: "Aguarde..."
        });
        loader.present(); */

        this.usuarioProvider.lerLocal().then(_userId => {
            this.usuarioProvider.byId(_userId).subscribe(_user => {
                this.perfil = new User();
                this.perfil.id = _userId;
                this.perfil.nome = _user['nome'];
                this.perfil.email = _user['email'];

                const path = '/user/' + this.perfil.id + '/foto.jpg';

                this.fireStorageProvider.downloadImageStorage(path).then(_data => {
                    console.log('foto', _data);
                    this.foto = _data;

                    /* loader.dismiss(); */
                });
            });
        });
    }

    ecolherFoto() {
        this.fileUserPhoto.nativeElement.click();
        /* const isMobile = this.platform.is('cordova');
        console.log('mobile', isMobile);

        if (isMobile) {
            this.abrirCelular();
        } else {
            this.abrirArquivos();
        } */
    }

    processWebImage($event) {
        this.fireStorageProvider.processWebImage($event, (imageBase64, w, h) => {
            this.foto = imageBase64;
            this.isUploaded = true;
        });
    }

    salvar() {
        if (this.isUploaded) {
            this.fireStorageProvider.uploadImageStorage(this.foto, '/user/' + this.perfil.id + '/foto.jpg');
        }
    }

}
