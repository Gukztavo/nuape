import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class  AuthService extends BaseService {
  router: Router;
  user: User = null;
  user_logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user_logged$ = this.user_logged.asObservable();
  private userRole: string;

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

  cadastrar(data: any): Promise<any> {
    const token = localStorage.getItem('authToken'); //pega o mano token
    // define headers e o mano token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Adiciona o token
    });

    console.log('Enviando dados para o endpoint:', data);

    return firstValueFrom(
      this.http.post(`${this.api_url}/professor`, data, { headers })
    ).then(response => {
      console.log('Resposta recebida:', response);
      return response;
    }).catch(error => {
      console.error('Erro ao cadastrar:', error);
      return Promise.reject(error);
    });
  }

  getMe(): Promise<any> {
    return firstValueFrom(this.http.get(this.api_url + '/me', this.get_tokens));
  }

  setUser(data: any, callback: any = null) {
    if (data) {
      console.log(data);
      this.user = new User(data);
      this.userRole =data.role;
      this.user_logged.next(true);
    }

    if (callback) {
      callback(true);
    }
  }
  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  unsetUser(callback: any = null) {
    this.unsetApiToken();
    this.user = null;

    if (callback) {
      callback(true);
    }
  }

  getApiToken(): string {
    const token = localStorage.getItem('nuapi-token');
    console.log('Token recuperado do localStorage:', token);
    return token;
  }

}
