import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Customer } from '../../models/customer';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  customer: Customer;
  loginForm: FormGroup;
  constructor(private auth: AuthService, private fb: FormBuilder, private alertCtrl:AlertController) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmitLogin() {
    this.auth
      .login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      )
      .then((user) => {
        this.showAlert(
          'Exitoso',
          'Has Iniciado Correctamente',
          'Bienvenido.'
        );
        
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async showAlert(header, subHeader, message) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
