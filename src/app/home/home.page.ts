import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user : User = null;
  
  constructor(private userService : AuthServiceService) {
    this.user = this.userService.user;
    console.log(this.user)
   }
  
  ngOnInit() {
  }

}
