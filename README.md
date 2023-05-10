
debugar celular Android:  
vivaldi://inspect/device#devices  
chrome://inspect/device#devices


lista de comandos:  
```
ionic start auth0 --type=angular --cordova
copy icon.png and splash.png to /resources
ionic cordova resources

ng serve
ionic build
ionic cordova build android

npm install cordova-plugin-screen-orientation
npm i es6-promise-plugin

npm i @ionic-native/local-notifications
ionic cordova plugin add cordova-plugin-local-notification
```

config.xml:  
<preference name="AndroidXEnabled" value="true" />  

https://github.com/katzer/cordova-plugin-local-notifications/issues/1963

```
pnpm i @ionic-native/core
pnpm i webpack

pnpm i cordova-plugin-androidx cordova-plugin-androidx-adapter jetifier
cordova plugin add cordova-plugin-androidx-adapter
npx jetifier
ionic cordova platform rm android
ionic cordova platform add android
ionic build
ionic cordova build android
ionic cordova run android
```