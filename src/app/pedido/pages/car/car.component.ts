import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Producto } from 'src/app/productos/interfaces/Producto';
import { ProductosService } from 'src/app/productos/services/productos.service';
import { DetallesPedido, Pedido } from '../../interfaces/Pedido';
import Swal from 'sweetalert2';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private productoService: ProductosService,
    private pedidoService: PedidoService
  ) { }

  productos: Producto[] = [];
  detallePedidos: DetallesPedido[] = [];
  totalPedido: number = 0;

  ngOnInit(): void {
    if(localStorage.getItem("detallePedidos") != null && this.authService.auth != null ) {
      this.detallePedidos = JSON.parse(localStorage.getItem("detallePedidos")!);
      this.totalPedido = JSON.parse(localStorage.getItem("totalPedido")!);
  }
  }

  save() {
    Swal.fire({
      title: '¿Enviar pedido?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `Cancelar`,
    }).then((result) => {

      if (result.isConfirmed) {

        let pedido: Pedido = {
          monto: this.totalPedido,
          detallesPedido: this.detallePedidos,
          usuario: {id: this.authService.auth.id}
        }
    
        this.pedidoService.save(this.authService.token, pedido).subscribe({
          next: (orden) => {
            this.detallePedidos = [];
            this.detallePedidos = [...this.detallePedidos];
            this.totalPedido = 0;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: "Pedido registrado correctamente",
              showConfirmButton: false,
              timer: 1500
            })
            localStorage.removeItem("detallePedidos");
            localStorage.removeItem("totalPedido");
            console.log(pedido)
          },
          error: (err) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: "Error al enviar el pedido",
              showConfirmButton: false,
              timer: 1500
            })
          }
        });

      } else if (result.isDenied) {
        
      }
    })
  }

  deleteDetalle(id: number) {
    let index = this.detallePedidos.findIndex(element => element.id == id);

    this.totalPedido -= this.detallePedidos[index].producto!.precio! * this.detallePedidos[index].cantidad!;
    this.detallePedidos.splice(index, 1);
    this.detallePedidos = [...this.detallePedidos];

    localStorage.setItem("detallePedidos",  JSON.stringify(this.detallePedidos));
    localStorage.setItem("totalPedido",  JSON.stringify(this.totalPedido));
  }

}
