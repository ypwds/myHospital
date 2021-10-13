import { Component, ViewChild } from '@angular/core';
import { LoadingController, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

/* import { Storage } from "@ionic/storage"; */
import { UserProvider } from '../providers/user/user';
import { FirebaseStorageProvider } from '../providers/firebase-storage/firebase-storage';
import { User } from '../models/user';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    //rootPage: any = HomePage;
    rootPage: any = 'LoginPage';
    login = false;
    perfil = new User();
    foto = "../assets/imgs/userFoto.png";
    nome = "Fulano"

    pages: Array<{ title: string, component: any, seticon: string }>;

    constructor(public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public userProvider: UserProvider,
        public menuCtrl: MenuController,
        public fireStorageProvider: FirebaseStorageProvider,
        public loadingCtrl: LoadingController,
        /* public storage: Storage */
    ) {

        console.log("CARREGANDO FOTO");
        this.carregarInfos();

        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage, seticon: 'home' },
            /* { title: 'Perfil', component: 'PerfilPage', seticon: 'person' }, */
            { title: 'Clínicas', component: 'ClinicasListPage', seticon: 'medkit' },
            { title: 'Médicos', component: 'MedicosListPage', seticon: 'contact' },
            { title: 'Pacientes', component: 'PacientesListPage', seticon: 'people' },
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            //persistindo o login no app
            /* this.storage.get('usuario').then(_usuario => { */
            this.userProvider.lerLocal().then(_usuario => {
                console.log('AP COMPONENT', _usuario);

                if (_usuario && _usuario.length > 0) {
                    // if(_usuario && _usuario.email > 0) {
                    this.rootPage = HomePage;
                } else {
                    this.rootPage = 'LoginPage';
                }

            });
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    sair() {
        /* this.storage.remove('usuario').then(_data => { */
        this.userProvider.removerLocal().then(_data => {
            this.nav.setRoot('LoginPage');
            //resetando a foto quando for sair da conta!
            this.foto = "../assets/imgs/userFoto.png";
            this.nome = "Fulano"
            this.menuCtrl.toggle();
        });
    }

    carregarInfos() {
        //careggando a foto de perfil
        this.userProvider.lerLocal().then(_userId => {
            this.userProvider.byId(_userId).subscribe(_user => {

                console.log("Usuário: ", _user);
                console.log("Nome do usuário: ", _user['nome']);

                this.perfil = new User();
                this.perfil.id = _userId;
                this.perfil.nome = _user['nome'];
                this.perfil.email = _user['email'];

                this.nome = this.perfil.nome;

                const path = '/user/' + this.perfil.id + '/foto.jpg';

                this.fireStorageProvider.downloadImageStorage(path).then(_data => {
                    console.log('foto', _data);
                    this.foto = _data;
                });
            });
        });
    }

    abrirPerfil() {
        this.nav.push('PerfilPage');
        this.menuCtrl.toggle();
    }
}
