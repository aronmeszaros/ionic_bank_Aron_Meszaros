import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import {User} from '../Entities/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import {UserService} from '../Services/user.service';
import { ToastController } from '@ionic/angular';
import { MessageService } from '../Services/message.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  animations: [
    trigger('appear',[
      state('*', style({
        transform: 'translateX(100%)',
        opacity:0,
      })),
      state('pageLoaded', style({
        transform: 'translateX(0%)',
        opacity:1,
      })),
      transition('* => pageLoaded', [
        animate('1s ease-out')
      ])
    ])
  ]
})
export class EditProfilePage implements OnInit {
  @Input() user: User;
  messages: string[] = [];
  isPageLoaded = false;

  constructor(public toastController: ToastController, private messageService: MessageService, private userService: UserService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }
  ionViewDidEnter(){
    this.isPageLoaded = true;
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

  update(){
    if(this.phonenumber(this.user.phone)){
    this.userService.updateUser(this.user).subscribe(() => this.goBack());
    }else{return;}
  }

  phonenumber(inputtxt: string): boolean{
    let phoneno = /^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
      if((inputtxt.match(phoneno))){
        return true;
      }
      else{
        this.messageService.addInfo('Phone number is invalid needs to be +XXX XXX XXX XXX');
        this.loadMessages(10000);
        return false;
      }
  }

  async loadMessages(duration: number) {
    //Display messages with toast
    this.messages = this.messageService.getInfo();
    if(this.messages.length>0){
      const toast = await this.toastController.create({
        message: this.messages[0],
        duration: duration
      });
      toast.present();
    }
    this.messageService.clearInfo();
  }
}
