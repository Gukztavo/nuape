import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {
    email: '',
    password: '',
  };

  ionViewWillEnter() {
    localStorage.clear();
    sessionStorage.clear();
  }

  constructor(
    private menuController: MenuController,
    private authService: AuthServiceService,
    private router: Router,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.menuController.enable(false);
  }

  login() {
    if (!this.credentials.email || this.credentials.email == '') {
      return this.helperService.toast('E-mail é obrigatório', 'warning');
    }

    if (!this.credentials.password || this.credentials.password == '') {
      return this.helperService.toast('Senha é obrigatório', 'warning');
    }

    this.helperService.loading('Logando...');

    this.authService

      .login({
        email: this.credentials.email,
        password: this.credentials.password,
      })
      .then(
        (response) => {
          if (response.token) {
            this.authService.setApiToken(response.token);
            this.router.navigate(['/attempt']);
          } else {
            this.helperService.toast('Erro com token', 'danger');
          }
          this.helperService.loading_dismiss();
        },
        (error) => {
          this.helperService.loading_dismiss();
          this.helperService.responseErrors(error);
        }
      );
  }
}
