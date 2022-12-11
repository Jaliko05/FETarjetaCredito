import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private myAppUrl = "https://localhost:7106/"
  private myApiUrl = "api/Tarjeta/"

  constructor(private http: HttpClient) { }

  getLisTarjetas(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

  addTarjeta(data:any){
    return this.http.post(this.myAppUrl + this.myApiUrl, data);
  }

  deleteTarjeta(id:number): Observable<any>{
    return this.http.delete<any>(this.myAppUrl  + this.myApiUrl + id);
  }

  updateTarjeta(id:number, data:any):Observable<any>{
    return this.http.put<any>(this.myAppUrl  + this.myApiUrl + id, data)
  }
}
