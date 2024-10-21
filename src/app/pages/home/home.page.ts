import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { User } from '../../model/user';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  user : User = null;
  
  constructor(private userService : AuthServiceService,
    private menuController: MenuController,
  ) {
    this.user = this.userService.user;
    console.log(this.user)
   }
  
  ngOnInit() {
    this.menuController.enable(true);

  }

}
