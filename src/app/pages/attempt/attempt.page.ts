import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.page.html',
  styleUrls: ['./attempt.page.scss'],
})
export class AttemptPage implements OnInit {
  urlOld: string = '';

  constructor(
    private menuController: MenuController,
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService
  ) {
    this.urlOld = this.route.snapshot.paramMap.get('url');
  }

  ngOnInit() {
    this.menuController.enable(false);
    this.attempt();
  }

  attempt() {
    if (this.userService.api_token_value) {
      this.userService.getMe().then(
        (response) => {
          if (response) {
            this.userService.setUser(response.user, (response: boolean) => {
              console.log("urlold", this.urlOld)
              if (this.urlOld == '' || this.urlOld == null) {
                this.router.navigate(['/home']);
              } else {
                this.router.navigateByUrl(this.urlOld);
              }
            });
          }
        },
        (error) => {
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
}
