import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwitchUserPage } from './switch-user.page';

const routes: Routes = [
  {
    path: '',
    component: SwitchUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwitchUserPageRoutingModule {}
