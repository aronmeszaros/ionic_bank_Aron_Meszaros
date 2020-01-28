import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {User} from '../Entities/user';
import {UserService} from '../Services/user.service';
import { ToastController } from '@ionic/angular';
import { MessageService } from '../Services/message.service';

//Animations
import {AnimationController} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  animations: [
    trigger('appear',[
      state('*', style({
        transform: 'translateY(30px)',
        opacity:0
      })),
      state('pageLoaded', style({
        transform: 'translateY(0px)',
        opacity:1
      })),
      transition('* => pageLoaded', [
        animate('1s ease-out')
      ])
    ])
  ]
})
export class ProfilePage implements OnInit {
  @ViewChild("animate", {read: ElementRef, static: true}) animate: ElementRef;

  user: User;
  messages: string[] = [];
  isPageLoaded = false;

  constructor(private animationCtr: AnimationController, public toastController: ToastController, private messageService: MessageService, private route: ActivatedRoute, private userService: UserService, private location: Location) { }

  ngOnInit() {
    this.getUser();
  }

  ionViewDidEnter() {
    this.getUser();
    this.loadMessages();
    this.isPageLoaded = true;
  }
  ngAfterViewInit(){
    const animation = this.animationCtr
    .create()
    .addElement(this.animate.nativeElement)
    .duration(1500)
    .fromTo("transform", "translateY(20%)", "translateY(0px)")
    .fromTo("opacity", 0, 1);

    animation.play();
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
