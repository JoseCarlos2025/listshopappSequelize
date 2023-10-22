import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {
  ionicForm!: FormGroup;
  
  constructor(private router: Router, public formBuilder: FormBuilder, private itemService: ItemService) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: [''] 
   });
  }

  gotolist() {
    this.router.navigateByUrl("/list");
  }

  onFormSubmit() {
    if (!this.ionicForm.valid) {
      return false;
    } else {
      let item = {
        id: 0,
        name: this.ionicForm.value.name,
        itemlistId: 1
      }
      
      this.itemService.addItem(item)
        .subscribe((res) => {
          
        });
      
      return true;
    }
  }
}
