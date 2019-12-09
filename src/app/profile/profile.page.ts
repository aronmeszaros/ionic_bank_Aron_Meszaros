import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {User} from '../Entities/user';
import {UserService} from '../Services/user.service';
import { ToastController } from '@ionic/angular';
import { MessageService } from '../Services/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  messages: string[] = [];

  constructor(public toastController: ToastController, private messageService: MessageService, private route: ActivatedRoute, private userService: UserService, private location: Location) { }

  ngOnInit() {
    this.getUser();
  }

  ionViewDidEnter() {
    this.getUser();
    this.loadMessages();
  }

  getUser(): void {
    //const id = +this.route.snapshot.paramMap.get('id');
    const id = 1;
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }
  async loadMessages() {
    //Display messages with toast
    this.messages = this.messageService.getInfo();
    if(this.messages.length>0){
      const toast = await this.toastController.create({
        message: this.messages[0],
        duration: 3000
      });
      toast.present();
    }
    this.messageService.clearInfo();
  }

}
