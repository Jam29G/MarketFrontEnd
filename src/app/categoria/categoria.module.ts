import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmCategoriaComponent } from './pages/adm-categoria/adm-categoria.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
  
    AdmCategoriaComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    AdmCategoriaComponent
  ]
})
export class CategoriaModule { }
