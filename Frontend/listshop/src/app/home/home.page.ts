import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Listshop } from '../models/listshop';
import { ListshopService } from '../service/listshop.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  listshop: Listshop[]=[];

  constructor(private ListShopService: ListshopService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.getAlllistShop();
  }

  ionViewWillEnter() {
    this.getAlllistShop();
  }  

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Ingrese los datos',
      inputs: [
        {
          name: 'namelist',
          type: 'text',
          placeholder: 'Nombre de la lista',
        },
        {
          name: 'dateShop',
          type: 'date',
          placeholder: 'Fecha de compra',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          },
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            let listshop = {
              id: 0,
              list_name: data.namelist,
              date_shop: data.dateShop,
            };
            this.updateListShop(id,listshop);
          },
        },
      ],
    });

    await alert.present();
  }

  getAlllistShop() {
    this.ListShopService.getListShop().subscribe(Listshop => {
      this.listshop = Listshop;
    });
  }

  deleteListShop(id: number) {
    this.ListShopService.deleteListShop(id).subscribe(() => {
      this.getAlllistShop();
    })
  }


  gotoaddlist() {
    this.router.navigateByUrl("/addlist")
  }

  gotolist(id:number) {
    this.router.navigate(['/list'], { queryParams: { id: id } });
  }

  updateListShop(id: number,listshop: Listshop) {
    this.ListShopService.updateListShop(id, listshop)
    .subscribe((res) => {
      console.log("por aquí pasó")
      this.getAlllistShop();
    });
    
  }

}
