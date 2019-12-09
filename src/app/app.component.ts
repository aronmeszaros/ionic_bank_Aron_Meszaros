import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//Ionic Data Storage
import { Storage } from '@ionic/storage';
//Display message
import {MessageService} from './Services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'AM Banka';
  user_id = 1;
  messages: string[] = [];
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'pie'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Transactions',
      url: '/transactions',
      icon: 'logo-buffer'
    },
    {
      title: 'Payment',
      url: '/payment',
      icon: 'wallet'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private messageService: MessageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.storage.set('name', 'Aron');
    this.messageService.addInfo('Welcome');
    this.messages = this.messageService.getInfo();
  }

}
