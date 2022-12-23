import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})

export class ClienteService {
  private url = 'http://localhost:80/api/';
  constructor(private http: HttpClient) { }
  public ObtenerClientes() {
    return this.http.get<Cliente[]>(this.url);
  }

  Guardar(cliente: Cliente) {
    const formData = new FormData();
    formData.append('nombres', cliente.nombres);
    formData.append('apellidos', cliente.apellidos);
    formData.append('ruc_dni', cliente.ruc_dni);
    formData.append('direccion', cliente.direccion);
    formData.append('email', cliente.email);
    return this.http.post(this.url, formData);
  }

}
