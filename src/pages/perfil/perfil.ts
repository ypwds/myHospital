import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, IonicPage, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { User } from '../../models/user';
import { FirebaseStorageProvider } from '../../providers/firebase-storage/firebase-storage';
import { UserProvider } from '../../providers/user/user';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

    nome = '';
    email = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public usuarioProvider: UserProvider,
        public fireStorageProvider: FirebaseStorageProvider,
        public loadingCtrl: LoadingController,
        private camera: Camera,
        public platform: Platform,
        public actionSheetCtrl: ActionSheetController
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PerfilPage');

        const loader = this.loadingCtrl.create({
            content: "Aguarde..."
        });
        loader.present();

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

                    loader.dismiss();
                });
            });
        });
    }

    ecolherFoto() {
        const isMobile = this.platform.is('cordova');
        console.log('mobile', isMobile);

        if (isMobile) {
            this.abrirCelular();
        } else {
            this.abrirArquivos();
        }
    }

    abrirCelular() {

        const actionSheet = this.actionSheetCtrl.create({
            title: 'Selecione',
            buttons: [
                {
                    text: 'Câmera',
                    role: 'destructive',
                    handler: () => {
                        this.abrirCamera();
                    }
                }, {
                    text: 'Galeria',
                    handler: () => {
                        this.abrirGaleria();
                    }
                }, {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancelar clicado');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    private abrirCamera() {
        const options: CameraOptions = {
            quality: 50,
            // destinationType: this.camera.DestinationType.FILE_URI,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            allowEdit: false,
            targetHeight: 350,
            targetWidth: 350,

            // CAMERA
            sourceType: this.camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: true,
            cameraDirection: this.camera.Direction.FRONT,
            correctOrientation: true,
        }

        this.carregarImagem(options);
    }
    private abrirGaleria() {
        const options: CameraOptions = {
            quality: 50,
            // destinationType: this.camera.DestinationType.FILE_URI,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            allowEdit: false,
            targetHeight: 350,
            targetWidth: 350,

            // GALERIA
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true,
        }

        this.carregarImagem(options);
    }

    private carregarImagem(options) {
        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log('base64', base64Image)

            this.foto = base64Image;
            this.isUploaded = true;

        }, (err) => {
            // Handle error
            console.log("Erro ao carregar imagem!");
        });
    }

    abrirArquivos() {
        this.fileUserPhoto.nativeElement.click();
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
