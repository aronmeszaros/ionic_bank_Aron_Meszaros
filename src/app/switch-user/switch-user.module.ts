import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwitchUserPageRoutingModule } from './switch-user-routing.module';

import { SwitchUserPage } from './switch-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwitchUserPageRoutingModule
  ],
  declarations: [SwitchUserPage]
})
export class SwitchUserPageModule {}
