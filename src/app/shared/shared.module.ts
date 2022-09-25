import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    MenuComponent,
    MenuComponent
  ]
})
export class SharedModule { }
