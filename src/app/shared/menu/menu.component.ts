import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  authItems: MenuItem[] = [
    
    {
      label: "Usuarios",
      icon: "pi pi-user",
      routerLink: 'usuarios'
    },
    {
      label: "Categorias",
      icon: "pi pi-bookmark",
      routerLink: 'categorias'
    },
    {
      label: "Productos",
      icon: "pi pi-inbox",
      routerLink: 'productos'
    },
    {
      label: "Pedidos",
      icon: "pi pi-inbox",
      routerLink: 'pedidos'
    },
    {
      label: "Cerrar sesion",
      icon: "pi pi-power-off",
      command: () => {
        this.authService.auth = undefined;
        this.router.navigate(['./login']);
      }
    },
  ];

  defaultItems = [
    {
      label: "Inicio",
      icon: 'pi pi-home',
      routerLink: '/',
    },
    {
      label: "Iniciar sesion",
      icon: 'pi pi-users',
      routerLink: 'login',
    },
    {
      label: "Registrarse",
      icon: 'pi pi-user-plus',
      routerLink: 'register',
    },
  ]

  userItems = [
    {
      label: "Inicio",
      icon: 'pi pi-home',
      routerLink: '/', 
    },
    {
      label: "Carrito",
      icon: "pi pi-shopping-cart",
      routerLink: 'carrito',

    },
    {
      label: "Mis compras",
      icon: "pi pi-shopping-bag",
      routerLink: 'mis-compras'

    },
    {
      label: "Cerrar sesion",
      icon: "pi pi-power-off",
      command: () => {
        this.authService.auth = undefined;
        this.router.navigate(['./login']);
      }
    },
    
  ]

  ngOnInit(): void {
    

    

  } 

}
