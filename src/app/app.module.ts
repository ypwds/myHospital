import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { UserProvider } from '../providers/user/user';
import { env } from '../env/env';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { MedicosProvider } from '../providers/medicos/medicos';
import { PacientesProvider } from '../providers/pacientes/pacientes';
import { ClinicasProvider } from '../providers/clinicas/clinicas';
import { DadosProvider } from '../providers/dados/dados';
import { ExportProvider } from '../providers/export/export';
import { FirebaseStorageProvider } from '../providers/firebase-storage/firebase-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';

/* const firebaseConfig = {
  apiKey: "AIzaSyACn05thv-AWI_hbgnb62K5hu_oqfd8nC0",
  authDomain: "myhospital-27592.firebaseapp.com",
  databaseURL: "https://myhospital-27592-default-rtdb.firebaseio.com/",
  projectId: "myhospital-27592",
  storageBucket: "myhospital-27592.appspot.com",
  messagingSenderId: "233296888104",
  appId: "1:233296888104:web:6a8edab4e6f514aae0901d",
  measurementId: "G-P1YBMFLVD0"
}; */

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,

    //AngularFireModule.initializeApp(env.prodution ? env.prod : env.dev),
    AngularFireModule.initializeApp(env.prodution ? env.prod : env.dev),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider,
    MedicosProvider,
    PacientesProvider,
    ClinicasProvider,
    DadosProvider,
    ExportProvider,
    FirebaseStorageProvider,
    Geolocation,
    Camera
  ]
})
export class AppModule { }
