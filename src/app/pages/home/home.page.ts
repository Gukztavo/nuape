import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notifications.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notifications: any[] = [];
  user: User = null;
  showNotifications: boolean = false;
  filteredNotifications = [];
  currentFilter: 'unread' | 'all' = 'unread';
  readNotifications: any[] = [];
  unreadNotifications: any[] = [];


  constructor(
    private notificationService: NotificationService,
    private menuController: MenuController,
    private alertController: AlertController,
    private router: Router,
    private userService: AuthService
  ) {
    this.user = this.userService.user;
    console.log(this.user);
  }


  ngOnInit() {
    this.menuController.enable(true);
    this.loadNotifications();
  }
  toggleNotificationList() {
    this.showNotifications = !this.showNotifications;
  }


  // Função para carregar as notificações
  loadNotifications() {
    this.notificationService.fetchNotifications('all').then(notifications => {
      // Divida as notificações entre lidas e não lidas
      this.notifications = notifications;
      this.readNotifications = notifications.filter(notification => notification.read === true);
      this.unreadNotifications = notifications.filter(notification => notification.read === false);
      this.showNotifications = true;
    }).catch(error => {
      console.error('Erro ao carregar notificações:', error);
    });
  }

  onFilterChange(filter: any) {
    this.currentFilter = filter as 'unread' | 'all';
    this.applyFilter();
  }
  applyFilter() {
    if (this.currentFilter === 'unread') {
      this.filteredNotifications = this.notifications.filter(n => !n.read);
    } else {
      this.filteredNotifications = [...this.notifications];
    }
  }

  // Exibe as notificações em um alerta
  async openNotifications() {
    const notifications = await this.notificationService.fetchNotifications('unread');
    const alert = await this.alertController.create({
      header: 'Notificações',
      message: this.buildNotificationMessage(this.notifications),
      buttons: [
        {
          text: 'Marcar como lidas',
          handler: () => {
            this.markAllAsRead();
          }
        },
        {
          text: 'Fechar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  // Constrói a mensagem para as notificações
  buildNotificationMessage(notifications: any[]) {
    if (notifications.length === 0) {
      return 'Você não tem novas notificações.';
    }
    return notifications.map(n => `<p>${n.title}: ${n.comment}</p>`).join('');
  }

  // Marca notificações como lidas

  async markAllAsRead() {
    const ids = this.notifications.map(n => n.id);
    try {
      await this.notificationService.markNotificationsAsRead(ids);
      this.loadNotifications(); // Atualiza as notificações
    } catch (error) {
      console.error('Erro ao marcar notificações como lidas:', error);
    }
  }
  markSelectedAsRead() {
    const selectedNotifications = this.notifications.filter(n => n.selected);

    if (selectedNotifications.length === 0) {
      console.warn('Nenhuma notificação selecionada.');
      return;
    }

    const selectedIds = selectedNotifications.map(n => n.id);

    this.notificationService.markNotificationsAsRead(selectedIds).then(() => {
      selectedNotifications.forEach(n => {
        n.read = true;
        n.selected = false;
      });
      this.applyFilter();
    }).catch(error => {
      console.error('Erro ao marcar selecionadas como lidas:', error);
    });
  }
  toggleNotificationDropdown() {
    this.showNotifications = !this.showNotifications;
  }


}

