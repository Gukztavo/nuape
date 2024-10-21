import { Component } from '@angular/core';
import { User } from './model/user';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  public appPages = [
    { title: 'Logout', url: '/login/login.page', icon: 'exit' },
  ];
  public labels = null;
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
  