import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formRegistro: FormGroup;
  constructor(public fb: FormBuilder, public alertController: AlertController,
    public navCtrl: NavController,
    private authService: AuthService) {
    this.formRegistro = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirm_password': new FormControl("", Validators.required)
    });
  }


  ngOnInit() {
  }
  async guardar() {
    var f = this.formRegistro.value;
    // Con esta expresión regular puedes validar cualquier dirección de correo elecrónico que contenga caracteres Unicode
    var emailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    // Validación de correo en blanco
    if (f.email == "") {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Ingrese el correo , no debe estar en blanco',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    if (!emailValid.test(f.email)) {
      // Validación de correo
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Ingrese un email válido',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Validación de password en blanco 
    if (f.password == "") {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Ingrese la contraseña, no debe estar en blanco',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    // - 6caracteres (NO MAS DE 6 CACRACTERES)
    if (f.password.length > 6) {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'La contraseña debe tener como máximo 6 caracteres',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    // Validate that the confirm_password field matches the password field
    if (f.password != f.confirm_password) {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    var usuario = {
      email: f.email,
      password: f.password,
    }
    this.authService.registrar(usuario).subscribe(response => {
      this.navCtrl.navigateRoot('login');
    });
  }
}
