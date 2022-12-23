import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formEmail = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthService,
    public alertController: AlertController, public navCtrl: NavController) {

  }

  ngOnInit() { }

  async iniciar() {
    this.authService.verificarEmail({ email: this.formEmail.value.email })
      .subscribe(async response => {
        if ((response.data)) {
          const user = { email: this.formEmail.value.email, password: this.formEmail.value.password };
          this.authService.verificarClave(user).subscribe(async resp => {
            if (resp.data) {
              this.navCtrl.navigateRoot('home');
            }
            else {
              console.log('No Ingresaste');

              const alert = await this.alertController.create({
                header: "Error",
                message: 'Password no Valido',
                buttons: ['Aceptar']
              });
              await alert.present();
            }
          });

        } else {
          const alert = await this.alertController.create({
            header: "Error",
            message: 'Correo no Valido',
            buttons: ['Aceptar']
          });
          await alert.present();
        }
      }, (error) => {
        console.log(error);
      });
  }
}
