import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../models/item';
import { ListshopidService } from '../service/listshopid.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  Item: Item[]=[];
  ListShopId!: number;

  constructor(
    private ItemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private listshopidshare: ListshopidService,
    private alertController: AlertController
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.ListShopId = listshopidshare.getListShopId();
      console.log(this.ListShopId);

      const idParam = params.get('id');
      if (idParam) {

        this.ListShopId = parseInt(idParam, 10);
        this.listshopidshare.setListShopId(this.ListShopId); 

      } else if (this.listshopidshare.getListShopId() == null) {

        this.router.navigate(['/home']);
      }
    });
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Ingrese los datos',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre Item',
        }
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
            let item = {
              id: 0,
              name: data.name,
              itemlistId: this.ListShopId,
            };
            this.updateItem(id,item);
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
    this.getItemFromListShopId(this.ListShopId);
    console.log(this.ListShopId);
    
  }

  ionViewWillEnter() {
    this.getItemFromListShopId(this.ListShopId);
    console.log(this.ListShopId);
  }

  getItemFromListShopId(id: number) {
    this.ItemService.getItemFromListShopId(id).subscribe((Item) => {
      this.Item = Item;
      console.log(Item);
    });
  }

  deleteItem(id: number) {
    this.ItemService.deleteItem(id).subscribe(() => {
      this.getItemFromListShopId(id);
    });
    console.log('elimino');
  }

  updateItem(id: number,item: Item) {
    console.log("por aquí pasó")
    this.ItemService.updateListShop(id, item)
    .subscribe((res) => {
      console.log("por aquí pasó")
      this.getItemFromListShopId(this.ListShopId);
    });
    
  }

  gotohome() {
    this.router.navigateByUrl("/")
  }

  gotoadditem() {
    this.router.navigateByUrl("/additem")
  }


}

