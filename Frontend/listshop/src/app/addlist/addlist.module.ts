import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddlistPageRoutingModule } from './addlist-routing.module';
import { AddlistPage } from './addlist.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddlistPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [AddlistPage]
})
export class AddlistPageModule {}
