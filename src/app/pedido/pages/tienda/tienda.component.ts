import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';
import { Producto } from '../../../productos/interfaces/Producto';
import { DetallesPedido } from '../../interfaces/Pedido';
import { ProductosService } from '../../../productos/services/productos.service';
import Swal from 'sweetalert2';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private productoService: ProductosService,
    public pedidoService: PedidoService
  ) { }

  productos: Producto[] = [];
  sortOptions: SelectItem[] = [];
  sortOrder?: number;

  sortField?: string;

  detallePedidos: DetallesPedido[] = [];

  totalPedido: number = 0;

  showDetails = false;

  imagePath: string = "http://localhost:8080/api/productos/image";



  ngOnInit(): void {
    this.productoService.getAll().subscribe({
      next: (productos) => {
        this.productos = productos;
      },
      error: (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al consultar los productos: ' + err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

    if(this.authService.auth != undefined && this.authService.auth != null ) {
      this.detallePedidos = this.pedidoService.detallePedidos;
      this.totalPedido = this.pedidoService.totalPedido;
    }

    /*if(localStorage.getItem("detallePedidos") != null && this.authService.auth != null ) {
        this.detallePedidos = JSON.parse(localStorage.getItem("detallePedidos")!);
        this.totalPedido = JSON.parse(localStorage.getItem("totalPedido")!);
    } */


  }

  showOrdenes() {

  }

  addDetalle(id: number) {
    let index: number = this.productos.findIndex( element => element.id == id );

    let detalle: DetallesPedido = {};

    detalle.cantidad = this.productos[index].cantidadPedido;

    this.productos[index].cantidadPedido = undefined;


    detalle.producto  = {}

    detalle.producto = {...this.productos[index]}

    this.totalPedido += detalle.cantidad! * detalle.producto.precio!;
    detalle.precioUnitario = this.productos[index].precio;

    this.detallePedidos.push(detalle);
    this.pedidoService.detallePedidos = this.detallePedidos;
    this.pedidoService.totalPedido = this.totalPedido;

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: "Añadido al carrito",
      showConfirmButton: false,
      timer: 1500
    })
    //localStorage.setItem("detallePedidos",  JSON.stringify(this.detallePedidos));
    //localStorage.setItem("totalPedido",  JSON.stringify(this.totalPedido));
  }

}
