import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProductosService } from 'src/app/productos/services/productos.service';
import { Pedido } from '../../interfaces/Pedido';
import { PedidoService } from '../../services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-pedidos',
  templateUrl: './adm-pedidos.component.html',
  styleUrls: ['./adm-pedidos.component.css']
})
export class AdmPedidosComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private productoService: ProductosService,
    private pedidoService: PedidoService
  ) { }

  pedidos: Pedido[] = [];

  pedido: Pedido = {}

  public selectedPedidos: Pedido[] = [];

  selectedValue: string = "R";

  dialogTitle: string = "Detalles de venta";

  imagePath = "http://localhost:8080/api/productos/image";

  showDetails = false;

  showDialog(id: number) {

    let index: number = this.pedidos.findIndex( element => element.id == id );
    this.pedido = this.pedidos[index];
    this.showDetails = true;

  }

  changeState(id: number, estado: string, mensaje: string) {
    this.pedidoService.changeState(this.authService.token, id, estado).subscribe({
      next: (res) => {
        let index: number = this.pedidos.findIndex( element => element.id == res.id );
        this.pedidos.splice(index, 1);
        this.pedidos = [...this.pedidos];

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: "Cambio realizado correctamente",
          showConfirmButton: false,
          timer: 1500
        })


      },
      error: (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: "Ocurrio un error: " + err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  changeStateAlert(id: number, estado: string, mensaje: string) {
    Swal.fire({
      title: "Cambiar estado a " + mensaje,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {

      if (result.isConfirmed) {

        this.changeState(id, estado, mensaje);

      } else if (result.isDenied) {
        Swal.fire('Accion cancelada')
      }
    })
  }

  getByState() {
    this.pedidoService.getByState(this.authService.token, this.selectedValue).subscribe({
      next: (pedidos) => {
        this.pedidos = [...pedidos];
      },
      error: (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al obtener las ordenes: ' + err.error.message,
          showConfirmButton: false,
          timer: 1500
        })

        console.log(err);
      }
    })
  }

  ngOnInit(): void {

    this.pedidoService.getAll(this.authService.token).subscribe({
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
            title: 'Error al obtener los pedidos: ' + err.error.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    })

  }

}
