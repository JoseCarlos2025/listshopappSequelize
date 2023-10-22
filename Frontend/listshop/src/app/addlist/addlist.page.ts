import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListshopService } from '../service/listshop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlist',
  templateUrl: './addlist.page.html',
  styleUrls: ['./addlist.page.scss'],
})
export class AddlistPage implements OnInit {
  ionicForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, private listshopservice: ListshopService, private router: Router) {
    this.ionicForm = this.formBuilder.group({
      name: [''],
      date: ['']
    });
  }
  
  ngOnInit() {
  };

  onFormSubmit() {
    if (!this.ionicForm.valid) {
      return false;
    } else {
      let listshop = {
        id: 0,
        list_name: this.ionicForm.value.name,
        date_shop: this.ionicForm.value.date
      }
      this.listshopservice.addListShop(listshop)
        .subscribe((res) => {
          console.log("por aquí pasó")
          this.router.navigateByUrl("/home");
        });
        return true;
    }
  }

  gotohome() {
    this.router.navigateByUrl("/home")
  }

}
