import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

/* import { Storage } from "@ionic/storage"; */
import { UserProvider } from '../providers/user/user';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    //rootPage: any = HomePage;
    rootPage: any = 'LoginPage';

    pages: Array<{ title: string, component: any, seticon: string}>;

    constructor(public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public userProvider: UserProvider,
        /* public storage: Storage */
    ) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage, seticon: 'home' },
            { title: 'Perfil', component: 'PerfilPage', seticon: 'person' },
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
        });
    }
}
