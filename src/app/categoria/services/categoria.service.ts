import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = "http://localhost:8080/api";

  getAll(auth_token: string): Observable<Categoria[]> {
    const url = `${this.apiUrl}/categorias`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.get<Categoria[]>(url, { headers: headers });
  }

  getById(auth_token: string, id:number): Observable<Categoria> {

    const url = `${this.apiUrl}/categorias/${id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.get<Categoria>(url, {headers: headers})
  }

  create(auth_token: string, categoria:Categoria): Observable<Categoria> {
    const url = `${this.apiUrl}/categorias`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.post<Categoria>(url, categoria, {headers: headers});
  }

  update(auth_token: string, categoria:Categoria, id: number): Observable<Categoria> {
    const url = `${this.apiUrl}/categorias/${id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.put<Categoria>(url, categoria, {headers: headers})


  }

  delete(auth_token: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/categorias/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.delete(url, {headers: headers});
  }




}
