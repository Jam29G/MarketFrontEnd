import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../usuario/interfaces/Usuario';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  private apiUrl: string = "http://localhost:8080/api";

  getAll(auth_token: string): Observable<Role[]> {
    const url = `${this.apiUrl}/roles`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${auth_token}`
    })

    return this.http.get<Role[]>(url, { headers: headers });
  }
}
