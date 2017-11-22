import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProfileRoutingModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
