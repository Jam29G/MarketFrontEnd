import { Injectable } from '@angular/core';
import { Pedido } from '../interfaces/Pedido';
import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = "http://localhost:8080/api";

  getAll(auth_token: string): Observable<Pedido[]> {

    const url = `${this.apiUrl}/pedidos`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.get<Pedido[]>(url, {headers});
    
  }

  getByState(auth_token: string, state: string): Observable<Pedido[]> {

    const url = `${this.apiUrl}/pedidos?estado=${state}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.get<Pedido[]>(url, {headers});
    
  }

  changeState(auth_token: string, id: number, estado: string): Observable<any> {
    const url = `${this.apiUrl}/pedidos/${id}?estado=${estado}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.put<any>(url, undefined, {headers});

  }



  save(auth_token: string, pedido: Pedido): Observable<Pedido> {


    const url = `${this.apiUrl}/pedidos`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.post<Pedido>(url, pedido, {headers});
  }


}
