import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseService {
  url: string = 'notifications'; // Define o endpoint base

  // Buscar notificações
  async fetchNotifications(type: 'all' | 'unread' | 'read') {
    let path = '';
    switch (type) {
      case 'all':
        path = '';
        break;
      case 'unread':
        path = '/unread';
        break;
      case 'read':
        path = '/read';
        break;
    }

    const url = this.buildUrl(path); // Constrói a URL dinamicamente
    try {
      console.log(`Fetching notifications from: ${url}`);
      const notifications = await this.http.get<any[]>(url, this.get_tokens).toPromise();
      console.log('Notifications received:', notifications);
      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  // Marcar notificações como lidas
  markNotificationsAsRead(notificationIds: number[]) {
    // Criando o formato adequado para o backend
    const payload = {
      notifications: notificationIds,
    };

    const headers = {
      Authorization: `Bearer ${this.api_token_value}`,
      'Content-Type': 'application/json',
    };

    return this.http.put(`${environment.api_url}/notifications`, payload, { headers }).toPromise();
  }

}
