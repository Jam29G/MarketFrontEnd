import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../usuario/interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  auth: any = undefined;
  token: any = undefined;
  roles: any[] = [];
  isAdmin: boolean = false;

  login(usuario: Usuario): Observable<any> {

    const authUrl: string = "http://localhost:8080/oauth/token";

    const credenciales = btoa("angularapp" + ":" + "12345");

    const httpHeaders = new HttpHeaders( {
      "Content-Type":"application/x-www-form-urlencoded",
      "Authorization": "Basic " + credenciales
    });
  

    const body = new HttpParams()
    .set('username', usuario.correo!)
    .set('password', usuario.password!)
    .set('grant_type', 'password');

    return this.http.post<any>(authUrl, body, {headers: httpHeaders})

  }
}
