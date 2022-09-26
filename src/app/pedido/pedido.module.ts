import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { CarComponent } from './pages/car/car.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AdmPedidosComponent } from './pages/adm-pedidos/adm-pedidos.component';
import { MisComprasComponent } from './pages/mis-compras/mis-compras.component';



@NgModule({
  declarations: [
    TiendaComponent,
    CarComponent,
    AdmPedidosComponent,
    MisComprasComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    CarComponent,
    TiendaComponent,
    AdmPedidosComponent,
    MisComprasComponent
  ]
})
export class PedidoModule { }
