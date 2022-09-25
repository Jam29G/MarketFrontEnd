import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { CarComponent } from './pages/car/car.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AdmPedidosComponent } from './pages/adm-pedidos/adm-pedidos.component';



@NgModule({
  declarations: [
    TiendaComponent,
    CarComponent,
    AdmPedidosComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    CarComponent,
    TiendaComponent,
    AdmPedidosComponent
  ]
})
export class PedidoModule { }
