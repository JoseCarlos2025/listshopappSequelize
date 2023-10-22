import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Listshop } from '../models/listshop';
import { Observable, of } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

const apiUrl = 'http://localhost:8800/api/itemlist';

@Injectable({
  providedIn: 'root'
})
export class ListshopService {

  currentListShopId!: number;

  constructor(private http: HttpClient) { }

  getListShopId(id: number): Observable<Listshop> {
    return this.http.get<Listshop>(apiUrl + "/" + id);
  }

  getListShop(): Observable<Listshop[]> {
    return this.http.get<Listshop[]>(apiUrl);
  };

  deleteListShop(id: number): Observable<any>{
    return this.http.delete(apiUrl + "/" + id);
  }

  addListShop(Listshop: Listshop): Observable<any>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("list_name", Listshop.list_name);
    bodyEncoded.append("date_shop", Listshop.date_shop);
    let body = bodyEncoded.toString();

    return this.http.post(apiUrl, body, httpOptions);
  }

  updateListShop(id: number, Listshop: Listshop): Observable<any>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("list_name", Listshop.list_name);
    bodyEncoded.append("date_shop", Listshop.date_shop);
    let body = bodyEncoded.toString(); 
    return this.http.put(apiUrl + "/" + id, body, httpOptions);
  }

}
