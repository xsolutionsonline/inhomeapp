import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Customer } from '../../models/customer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  implements OnInit {
  email: string;
  password: string;
  typePassword = 'password';
  registerForm: FormGroup;
  usuario: Customer;
  constructor(private fb: FormBuilder, private authService: AuthService, private alertCtrl:AlertController) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      names: ['', Validators.required],
      email: ['', Validators.required],
      emailNew: ['', Validators.required],
      password: ['', Validators.required],
      passwordNew: ['', Validators.required],
      phone: [''],
      age: [],
      consultant: [false],
    });
  }

  async OnSubmitRegister() {
    this.usuario = {
      ...this.registerForm.value,
      dni: '',
      address: '',
      version: 1.0,
    };
    if (this.registerForm.value.email === this.registerForm.value.emailNew) {
      if (
        this.registerForm.value.password === this.registerForm.value.passwordNew
      ) {
        await this.authService.register(this.usuario)
        .then(()=> this.showAlert(
          'Danger',
          'No has selecciondo tipo de documento',
          'debes seleccionar que tipo de documento deseas cargar.'
        ))
        .catch((error) => {
          console.log('errorRegister', error);
          return;
        });
      } else {
        console.log('las contraseñas son diferentes');
      }
    } else {
      console.log('los email son diferentes');
    }
  }

  viewPassword(type) {
    this.typePassword = type;
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
