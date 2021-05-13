import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Customer } from './models/customer';
import { Storage } from '@ionic/storage';
import { AuthService } from './services/auth.service';
import { CustomerService } from './services/customer.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  unSubject$ = new Subject();

  customer: Customer;
  cerroSesion: boolean;
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private storage: Storage,
    private oAuth: AuthService,
    private customerService: CustomerService
  ) {
    this.auth.authState.subscribe((user: any) => {
      debugger;
      if (user == null) {
        this.cerroSesion = true;
        this.storage.clear();
        this.unSubject$.next();
        this.unSubject$.complete();
        this.router.navigate(['/']);
      } else {
        this.cerroSesion = false;
        this.oAuth.setUid(user.uid);
        this.customerService
          .getCustomerData(user.uid)
          .pipe(takeUntil(this.unSubject$))
          .subscribe((customerO) => {
            if (!this.cerroSesion) {
              storage.remove('customer');
              storage.set('customer', customerO);

              this.router.navigate(['/dashboard'], {
                replaceUrl: true,
              });
            } else {
              this.router.navigate(['/'], {
                replaceUrl: true,
              });
            }
          });
      }
    });
  }
}
