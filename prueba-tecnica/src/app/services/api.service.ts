import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://randomuser.me/api/?results=500';

  constructor(private http: HttpClient) {}

  // Método para obtener datos de la API
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getUsersByNation(nation: string[]): Observable<any> {
    let params = new HttpParams().set('nat', nation.join(","));  // Agregamos el parámetro 'nation'
    
    return this.http.get<any>(this.apiUrl,{params} );
  }
}
