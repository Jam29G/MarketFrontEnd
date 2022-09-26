import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductosService } from 'src/app/productos/services/productos.service';
import { Pedido } from '../../interfaces/Pedido';
import { PedidoService } from '../../services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit {

  pedidos: Pedido[] = [];

  pedido: Pedido = {};

  imagePath = "http://localhost:8080/api/productos/image";

  public selectedPedidos: Pedido[] = [];

  showDetails = false;

  dialogTitle = "Detalles de compra"

  showDialog(id: number) {

    let index: number = this.pedidos.findIndex( element => element.id == id );
    this.pedido = this.pedidos[index];
    this.showDetails = true;

  }

  constructor(
    public authService: AuthService,
    private router: Router,
    private productoService: ProductosService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {

    if(this.authService.auth == undefined) {
      this.router.navigate(['./']);
      return
    }

    this.pedidoService.getByUserId(this.authService.token, this.authService.auth.id).subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos;
      },
      error: (err) => {
        if(err.status == 403 || err.status == 401) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No tienes los permisos para acceder a esta sección',
            showConfirmButton: false,
            timer: 1500
          })

          this.router.navigate(['./']);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error obtener los pedidos: ' + err.error.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    })

  }

  printEstado(estado: string): string {
    let fullEstado: string = "";
    switch(estado) {
      case 'R': 
        fullEstado = "Recibido"
      break;
      case 'E': 
        fullEstado = "Enviado"
      break;
      case 'A': 
        fullEstado = "Anulado"
      break;
      case 'F': 
        fullEstado = "finalizado"
      break;
    }

    return fullEstado;
  }

}
