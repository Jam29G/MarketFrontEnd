import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaModule } from './categoria/categoria.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ProductosModule } from './productos/productos.module';
import { PedidoModule } from './pedido/pedido.module';
import { RolModule } from './rol/rol.module';

//Cambiar el locale de la app
import localeEs from '@angular/common/locales/es-SV';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PrimeNgModule,
    UsuarioModule,
    AuthModule,
    HttpClientModule,
    CategoriaModule,
    BrowserAnimationsModule,
    ProductosModule,
    PedidoModule,
    RolModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
