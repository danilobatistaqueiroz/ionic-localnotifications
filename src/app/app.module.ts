import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalNotifications, Vibration, NativeAudio],
  bootstrap: [AppComponent],
})
export class AppModule {}
