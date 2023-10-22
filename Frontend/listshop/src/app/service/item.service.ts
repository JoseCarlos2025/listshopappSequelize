import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

const apiUrl = 'http://localhost:8800/api/items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  currentItemId!: number;

  constructor(private http: HttpClient) { }

  getItemFromListShopId(id:number): Observable<Item[]> {
    return this.http.get<Item[]>(apiUrl+"/" + id);
  };

  deleteItem(id: number): Observable<any>{
    return this.http.delete(apiUrl + "/" + id);
  }

  addItem(item: Item): Observable<any>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", item.name);
    bodyEncoded.append("itemlistId", item.itemlistId.toString());
    let body = bodyEncoded.toString();

    return this.http.post(apiUrl, body, httpOptions);
  }

  updateListShop(id: number, item: Item): Observable<any>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", item.name);
    bodyEncoded.append("itemlistId", item.itemlistId.toString());
    let body = bodyEncoded.toString(); 
    return this.http.put(apiUrl + "/" + id, body, httpOptions);
  }

}
