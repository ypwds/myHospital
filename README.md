# myHospital

Aplicativo desenvolvido em Ionic v3 com CRUD de pacientes, médicos e clinicas com firebase.

## Comandos Importantes

Abaixo listo alguns comandos básicos para o projeto.


### Após o clone, rodar o seguinte comando:
O código abaixo irá baixa todas as dependências necessárias para roda o projeto.
> npm install

###  BUILD ANDROID

Use os códigos abaixo para build o projeto para o android:
> ionic cordova platform add android@7.1.4
> ionic cordova build android

### BUILD WEB

> ionic build --minifyjs --minifycss

### PUBLICAR NO FIREBASE HOSTING

> npm install -g firebase-tools 

> firebase login firebase init 

> firebase deploy 

> firebase deploy --only hosting 

> firebase use --add **nome do banco do projeto**