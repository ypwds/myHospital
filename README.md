# myHospital
Aplicativo desenvolvido em Ionic v3 com CRUD de pacientes, médicos e clinicas com firebase.

#Comandos Importantes

BUILD ANDROID
ionic cordova platform add android@7.1.4  //add a versão do android ao projeto
ionic cordova build android //gerar o apk do aplicaitovo

BUILD WEB
ionic build --minifyjs --minifycss

PUBLICAR NO FIREBASE HOSTING
npm install -g firebase-tools 
firebase login 
firebase init 
firebase deploy 
firebase deploy --only hosting 
firebase use --add escola-59267
