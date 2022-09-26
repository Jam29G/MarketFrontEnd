import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';

import { LoginComponent } from './auth/pages/login/login.component';
import { AdmCategoriaComponent } from './categoria/pages/adm-categoria/adm-categoria.component';
import { AdmProductosComponent } from './productos/pages/adm-productos/adm-productos.component';
import { TiendaComponent } from './pedido/pages/tienda/tienda.component';
import { CarComponent } from './pedido/pages/car/car.component';
import { PedidoService } from './pedido/services/pedido.service';
import { AdmPedidosComponent } from './pedido/pages/adm-pedidos/adm-pedidos.component';
import { AdminUsuarioComponent } from './usuario/pages/admin-usuario/admin-usuario.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { MisComprasComponent } from './pedido/pages/mis-compras/mis-compras.component';


const routes: Routes = [
  {
    path: '',
    component: TiendaComponent,
    pathMatch: 'full'
  },
  {
    path: 'categorias',
    component: AdmCategoriaComponent
  },
  {
    path: 'productos',
    component: AdmProductosComponent
  },
  {
    path: 'usuarios',
    component: AdminUsuarioComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'carrito',
    component: CarComponent
    
  },
  {
    path: 'pedidos',
    component: AdmPedidosComponent
    
  },
  {
    path: 'mis-compras',
    component: MisComprasComponent
    
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}