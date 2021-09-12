import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACn05thv-AWI_hbgnb62K5hu_oqfd8nC0",
  authDomain: "myhospital-27592.firebaseapp.com",
  projectId: "myhospital-27592",
  storageBucket: "myhospital-27592.appspot.com",
  messagingSenderId: "233296888104",
  appId: "1:233296888104:web:6a8edab4e6f514aae0901d",
  measurementId: "G-P1YBMFLVD0",
  databaseURL: "https://myhospital-27592-default-rtdb.firebaseio.com/"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    //AngularFireModule.initializeApp(env.prodution ? env.prod : env.dev),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
