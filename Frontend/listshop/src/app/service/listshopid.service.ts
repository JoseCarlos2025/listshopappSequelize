import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListshopidService {
  private listShopId!: number ;

  setListShopId(id: number) {
    this.listShopId = id;
  }

  getListShopId(): number {
    return this.listShopId;
  }
  
  constructor() { }
}
