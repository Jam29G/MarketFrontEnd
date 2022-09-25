import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmProductosComponent } from './pages/adm-productos/adm-productos.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    AdmProductosComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    
  ]
})
export class ProductosModule { }
