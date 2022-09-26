import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl: string = "http://localhost:8080/api";

  getAll(auth_token: string, estado: boolean): Observable<Usuario[]> {
    const url = `${this.apiUrl}/usuarios?estado=${estado}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.get<Usuario[]>(url, { headers: headers });
  }

  getById(auth_token: string, id:number): Observable<Usuario> {

    const url = `${this.apiUrl}/usuarios/${id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.get<Usuario>(url, {headers: headers})
  }

  create(auth_token: string, usuario:Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.post<Usuario>(url, usuario, {headers: headers});
  }

  createUser(usuario:Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/user`;

    return this.http.post<Usuario>(url, usuario);
  }

  update(auth_token: string, usuario:Usuario, id: number): Observable<Usuario> {
    const url = `${this.apiUrl}/usuarios/${id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.put<Usuario>(url, usuario, {headers: headers})


  }

  restore(auth_token: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/usuarios/restore/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.put<any>(url, undefined, {headers: headers})
  }

  delete(auth_token: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/usuarios/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.delete(url, {headers: headers});
  }


}
