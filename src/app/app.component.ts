import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthServiceService } from './services/auth-service.service';
import { AdminItems, TeacherItems } from './side-menu';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  appPages: any[];
  private ngUnsubscriber = new Subject<void>();

  constructor(private userService: AuthServiceService) {
    this.buildMenu(true);
    this.userService.user_logged$
      .pipe(takeUntil(this.ngUnsubscriber))
      .subscribe((_) => {
        this.onChangeUser(_);
      });
  }

  logoff() {
    this.buildMenu(false);
    this.userService.logout();
  }

  buildMenu(value: boolean) {
    let menuItems = [];
    if (value && this.userService.user) {
      menuItems = this.userService.user.is_admin ? AdminItems : TeacherItems;
    }
    this.appPages = menuItems;
  }

  onChangeUser(_) {
    this.buildMenu(true);
  }

  ngOnDestroy() {
    this.ngUnsubscriber.next();
    this.ngUnsubscriber.complete();
  }
}
