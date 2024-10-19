import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { HelperService } from '../service/helper.service';


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


  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private helperService: HelperService,
  ) {
  }

  ngOnInit() { }

  login() {
    if (!this.credentials.email || this.credentials.email == '') {
      this.helperService.toast('E-mail é obrigatório', 'warning');
    }

    if (!this.credentials.password || this.credentials.password == '') {
      this.helperService.toast('Senha é obrigatório', 'warning');
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
