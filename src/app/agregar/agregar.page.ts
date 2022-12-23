import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  @Input() cliente: Cliente[] | undefined;
  edit = false;
  datos = {
    nombres: '',
    apellidos: '',
    ruc_dni: '',
    direccion: '',
    email: ''
  };

  createFormGroup() {
    return new FormGroup({
      nombres: new FormControl('', [Validators.required, Validators.minLength(5)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(5)]),
      ruc_dni: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required,
      Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9*-]+.[a-zA-Z]{2,4}$")])
    });
  }

  validation_messages = {
    'nombres': [
      { type: 'required', message: 'Escriba Nombre.' },
      { type: 'minlength', message: 'Nombre maximo de 5 caracteres' }
    ],
    'apellidos': [
      { type: 'required', message: 'Escriba Apellido.' },
      { type: 'minlength', message: 'Apellido maximo de 5 caracteres' }
    ],
    'ruc_dni': [
      { type: 'required', message: 'Escriba RUC/DNI' },
      { type: 'maxlength', message: 'RUC/DNI es de 8 caracteres' }
    ],
    'direccion': [
      { type: 'required', message: 'Escriba direccion' },
      { type: 'maxlength', message: 'No puede escribir mas de 100 caracteres' }
    ],
    'email': [
      { type: 'required', message: 'Escribir correo' },
      { type: 'pattern', message: 'No es un formato de correo' }
    ],
  }

  get nombres() {
    return this.registrarForm.get('nombres');
  }
  get apellidos() {
    return this.registrarForm.get('apellidos');
  }
  get ruc_dni() {
    return this.registrarForm.get('ruc_dni');
  }
  get direccion() {
    return this.registrarForm.get('direccion');
  }
  get email() {
    return this.registrarForm.get('email');
  }
  registrarForm: FormGroup;

  constructor(private service: ClienteService,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {
    this.registrarForm = this.createFormGroup();
  }

  ngOnInit() {
    if (this.cliente) {
      this.edit = true;
      // call the this.datos and assign the values to it
      this.datos.nombres = this.cliente[0].nombres;
      this.datos.apellidos = this.cliente[0].apellidos;
      this.datos.ruc_dni = this.cliente[0].ruc_dni;
      this.datos.direccion = this.cliente[0].direccion;
      this.datos.email = this.cliente[0].email;
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  onSubmit() {

    if (this.edit) {

    }
    else {
      const cliente = this.registrarForm.value;
      this.service.Guardar(cliente).subscribe(response => {
        this.modalCtrl.dismiss(response, 'creado');
        console.log(response);
      });
    }
  }
}
