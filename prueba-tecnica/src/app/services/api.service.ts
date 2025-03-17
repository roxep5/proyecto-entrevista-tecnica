import { HttpClient } from '@angular/common/http';
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
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error al obtener datos:', error);
        return throwError(() => new Error('Error en la API'));
      })
    );
  }

}
