import { Component } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  clientes: Cliente[] | undefined;
  constructor(private service: ClienteService
  ) {
  }
  ngOnInit() {
    this.service.ObtenerClientes().subscribe(
      (response) => {
        console.log("respuesta >>", response);
        this.clientes = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
