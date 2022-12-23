import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Email {
  email: string | null | undefined,
}

interface User {
  email: string | null | undefined,
  password: string | null | undefined,
}

interface Datos {
  email: string,
  password: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:80/api/";

  constructor(private http: HttpClient) { }

  public verificarEmail(obj: Email) {
    return this.http.post<any>(this.url + `auth/`, obj);
  }
  public verificarClave(obj1: User) {
    return this.http.post<any>(this.url + `auth/login.php`, obj1);
  }
  public registrar(usuario: Datos) {
    const formData = new FormData();
    formData.append('email', usuario.email);
    formData.append('password', usuario.password);
    return this.http.post(this.url + `auth/registrar.php`, formData);
  }
}
