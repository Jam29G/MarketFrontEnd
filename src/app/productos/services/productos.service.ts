import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl: string = "http://localhost:8080/api";
  constructor(private http: HttpClient) { }

  getAll(): Observable<Producto[]> {
    const url = `${this.apiUrl}/productos`;
    /*
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    }) */

    return this.http.get<Producto[]>(url);
  }

  getInactivos(auth_token: string): Observable<Producto[]> {
    const url = `${this.apiUrl}/productos/inactivos`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.get<Producto[]>(url, {headers});
  }

  getById(auth_token: string, id: number): Observable<Producto> {
    const url = `${this.apiUrl}/productos/${id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.get<Producto>(url, {headers});
  }

  save(auth_token: string, producto: Producto, img?: File): Observable<Producto> {
    const url = `${this.apiUrl}/productos`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    const formData = new FormData();

    let json = new Blob([JSON.stringify(producto)], {type: "application/json"})
    formData.append("producto", json );

    if(img != undefined && img != null) {
      formData.append("img", img, img.name);
    }

    return this.http.post<Producto>(url, formData, {headers});

  }

  update(auth_token: string, producto: Producto, img?: File): Observable<Producto> {
    const url = `${this.apiUrl}/productos/${producto.id}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    const formData = new FormData();

    let json = new Blob([JSON.stringify(producto)], {type: "application/json"})
    formData.append("producto", json );

    if(img != undefined && img != null) {
      formData.append("img", img, img.name);
    }

    return this.http.put<Producto>(url, formData, {headers});

  }

  changeState(auth_token: string, id: number, estado: string): Observable<any> {
    const url = `${this.apiUrl}/productos/${id}/estado?estado=${estado}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.put<any>(url, undefined, {headers});
  }

  delete(auth_token: string, id:number): Observable<any> {
    const url = `${this.apiUrl}/productos/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.delete<any>(url, {headers});
  }

   

  


}
