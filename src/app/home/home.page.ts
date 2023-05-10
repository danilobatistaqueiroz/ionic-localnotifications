import { Component } from '@angular/core';
import { ELocalNotificationTriggerUnit, ILocalNotification, ILocalNotificationActionType, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scheduled:ILocalNotification[]=[];

  constructor(
    private plt: Platform, 
    private localNotifications: LocalNotifications,
    private vibration: Vibration,
    private audio: NativeAudio,
    private alertCtrl: AlertController) {
      this.plt.ready().then(() => {
        this.localNotifications.on('click').subscribe(res => {
          console.log('click:', res);
          let msg = res.data ? res.data.mydata: '';
          this.showAlert(res.title, res.text, msg);
        });
        this.localNotifications.on('trigger').subscribe(res => {
          console.log('trigger:', res);
          let msg = res.data ? res.data.mydata: '';
          this.showAlert(res.title, res.text, msg);
        });
      });
    }

  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Danish Notification',
      data: { mydata: 'My hidden msg'},
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true
    })
  }

  recurringNotification() {
    this.localNotifications.schedule({
      id: 22,
      title: 'Recurring',
      text: 'Danish Recurring Notification',
      data: { mydata: 'My hidden msg'},
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
    })
  }

  repeatingDaily() {
    this.localNotifications.schedule({
      id: 32,
      title: 'Good Morning',
      text: 'Danish Daily',
      data: { mydata: 'My hidden msg'},
      trigger: { every: { hour: 11 , minute: 59 } }
    })
  }

    async sound(){
      this.localNotifications.schedule({
        sound:'file://assets/sound-effect.mp3',
        icon: 'file://assets/mushroom.png',
        text: '4:15 - 5:15 PM\nBig Conference Room',
        title: 'The Big Meeting',
        trigger: { in: 2, unit: ELocalNotificationTriggerUnit.SECOND },
      })
      await this.audio.preloadSimple('uniqueId1','assets/sound-effect.mp3');
      this.audio.play('uniqueId1').then(()=>console.log('ok'), (e:any)=>console.log('erro',e));
    }

  usingColorBackground() {
    this.localNotifications.schedule({
      title: 'The big survey',
      text: 'Are you a fan of RB Leipzig?',
      color: '#0000AA',
      sound:'false',
      smallIcon: 'res://calendar',
      actions: [
          { id: 'yes', title: 'Yes', needsAuth:false, editable:true },
          { id: 'no',  title: 'No', needsAuth: false, editable:true, type:ILocalNotificationActionType.INPUT }
      ]
    });
  }

  usingImageBackground() {
    this.localNotifications.schedule({
      title: 'The big survey',
      text: 'Are you a fan of RB Leipzig?',
      attachments: ['file://assets/mario-flower.png'],
      actions: [
          { id: 'yes', title: 'Yes' },
          { id: 'no',  title: 'No' }
      ]
    });
  }

  progressBar() {
    this.localNotifications.schedule({
      title: 'Sync in progress',
      text: 'Copied 2 of 10 files',
      progressBar: { value: 20 }
    });
  }

  buttonsYesNo(){
    this.localNotifications.schedule({
      title: 'Justin Rhyss',
      attachments: ['file://assets/stadium.png'],
      text: 'Do you want to go see a movie tonight?',
      actions: [{
          id: 'reply',
          title: 'Reply',
          foreground: true,
          icon: 'assets/mario-flower.png',
          editable: true,
      }],
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    });
  }

  vibrate(){
    this.localNotifications.schedule({
      vibrate:true,
      smallIcon:'assets/mushroom.png',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
      text: '4:15 - 5:15 PM\nBig Conference Room',
      title: 'The Big Meeting',
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    })
    //setTimeout(()=>this.vibration.vibrate([2000,1000,2000]),5000);
  }

  summarizing(){
    this.localNotifications.schedule({
      id: 15,
      title: 'Chat with Irish',
      icon: 'file://assets/car.png',
      text: [
          'I miss you',
          'I miss you more!',
          'I always miss you more by 10%'
      ]
    });
  }

  grouping(){
    this.localNotifications.schedule([
      { id: 0, title: 'Design team meeting', },
      { id: 1, summary: 'danilobatistaqueiroz@gmail.com', group: 'email', groupSummary: true },
      { id: 2, title: 'Please take all my money', group: 'email' },
      { id: 3, title: 'A question regarding this plugin', group: 'email' },
      { id: 4, title: 'Wellcome back home', group: 'email' }
    ]);
  }

  led(){
    this.localNotifications.schedule({
      led:{color:'red',on:1000, off:1000},
      smallIcon:'assets/mushroom.png',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
      text: '4:15 - 5:15 PM\nBig Conference Room',
      title: 'The Big Meeting',
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    })
  }

  lockscreen(){
    this.localNotifications.schedule({
      lockscreen:true,
      smallIcon:'assets/mushroom.png',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
      text: '4:15 - 5:15 PM\nBig Conference Room',
      title: 'The Big Meeting',
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    })
  }

  removeSticky() {
    this.localNotifications.clear(500);
  }
  sticky(){
    this.localNotifications.schedule({
      id:500,
      sticky:true,
      smallIcon:'res://assets/mushroom.png',
      icon: 'assets/mushroom.png',
      text: '4:15 - 5:15 PM\nBig Conference Room',
      title: 'The Big Meeting',
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    })
  }

  wakeup(){
    this.localNotifications.schedule({
      wakeup:true,
      smallIcon:'res://assets/mushroom.png',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
      text: '4:15 - 5:15 PM\nBig Conference Room',
      title: 'The Big Meeting',
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    })
  }

  foreground(){
    this.localNotifications.schedule({
      foreground:true,
      icon: 'https://media.istockphoto.com/id/1352986285/vector/outline-lion-leo-head-face-hair-silhouette-logo-icon-with-black-and-white-color.jpg?s=612x612&w=0&k=20&c=0wmGeUZs2rSm3QhgargEc3vCe90DXXpBkO3iJnt77Hk=',
      text: '4:15 - 5:15 PM\nBig Conference Room',
      title: 'The Big Meeting',
      trigger: { in: 1, unit: ELocalNotificationTriggerUnit.SECOND },
    })
  }

  launch(){
    this.localNotifications.schedule({
      launch:true,
      smallIcon:'res://assets/mushroom.png',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
      text: '4:15 - 5:15 PM\nBig Conference Room',
      title: 'The Big Meeting',
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    })
  }

  silent(){
    this.localNotifications.schedule({
      silent:true,
      smallIcon:'res://assets/mushroom.png',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
      text: '4:15 - 5:15 PM\nBig Conference Room',
      title: 'The Big Meeting',
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    })
  }

  badge(){
    this.localNotifications.schedule({
      sound:'assets/sound-effect.mp3',
      badge: 10,
      smallIcon:'assets/mushroom.png',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw',
      text: '4:15 - 5:15 PM\nBig Conference Room',
      title: 'The Big Meeting',
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
    })
  }

  getAll() {
    this.localNotifications.getAll().then(res => {
      this.scheduled = res;
    });
  }

  showAlert(header:string, sub:string, msg:string) {
    this.alertCtrl.create({
      header: header,
      message: msg,
      buttons: ['Ok']
    }).then((alert:any) => alert.present());
  }

}
