import { Component, OnInit } from '@angular/core';
//User
import {User} from '../Entities/user';
import {UserService} from '../Services/user.service';

@Component({
  selector: 'app-switch-user',
  templateUrl: './switch-user.page.html',
  styleUrls: ['./switch-user.page.scss'],
})
export class SwitchUserPage implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void{
    this.userService.getUsers().subscribe(users => this.users = users);
  }

}
