import { Component } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
  selector: 'ap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ap';
  user;

  constructor(private api: ApiService) {
    this.api.getCurrentUser().subscribe((user: any) => this.user = user);
  }

  login() {
    this.api.login({email: 'topGamer', password: '123123123'}).subscribe();
  }

  logout() {
    this.api.logout();
  }
}
