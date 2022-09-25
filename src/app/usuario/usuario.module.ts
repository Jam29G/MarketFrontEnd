import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsuarioComponent } from './pages/admin-usuario/admin-usuario.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    AdminUsuarioComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    AdminUsuarioComponent
  ]
})
export class UsuarioModule { }
