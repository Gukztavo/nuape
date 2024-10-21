import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService extends BaseService {
  router: Router;
  user: User = null;
  user_logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user_logged$ = this.user_logged.asObservable();

  constructor(injector: Injector, router: Router) {
    super(injector);
    this.router = router;
  }

  get isLoggedIn() {
    return this.user != null;
  }

  login(credentials: any): Promise<any> {
    return firstValueFrom(
      this.http.post(this.api_url + '/' + 'login', credentials)
    );
  }

  logout() {
    this.unsetUser();
    this.router.navigate(['/login']);
  }

  getMe(): Promise<any> {
    return firstValueFrom(this.http.get(this.api_url + '/me', this.get_tokens));
  }

  setUser(data: any, callback: any = null) {
    if (data) {
      console.log(data);
      this.user = new User(data);

      this.user_logged.next(true);
    }

    if (callback) {
      callback(true);
    }
  }

  unsetUser(callback: any = null) {
    this.unsetApiToken();
    this.user = null;

    if (callback) {
      callback(true);
    }
  }
}
