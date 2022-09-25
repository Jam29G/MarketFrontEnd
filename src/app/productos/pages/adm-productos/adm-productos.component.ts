import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TreeNode } from 'primeng/api';
import { ProductosService } from '../../services/productos.service';
import { CategoriaService } from '../../../categoria/services/categoria.service';
import { Producto } from '../../interfaces/Producto';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Categoria } from '../../../categoria/interfaces/Categoria';

@Component({
  selector: 'app-adm-productos',
  templateUrl: './adm-productos.component.html',
  styleUrls: ['./adm-productos.component.css']
})
export class AdmProductosComponent implements OnInit {

  productos: Producto[] = [];
  producto: Producto = {};
  imagen?: File;
  mostrarInactivos = false;
  action: string = "crear";
  imagePath: string = "http://localhost:8080/api/productos/image";
  dialogTitle: string = "";
  saveOrUpdateDialog: boolean = false;
  nodes: TreeNode[] = [];
  nodeSelected: TreeNode = {
  }
  defaultCategoria: Categoria = {}


  constructor(
    private productoService: ProductosService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productoService.getAll().subscribe({
      next: (productos) => {
        this.productos = productos;
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
            title: err.message,
            showConfirmButton: false,
            timer: 1500
          })
        }

      
      }

    });

    this.categoriaService.getAll(this.authService.token).subscribe({
      next: (categorias) =>{
        
        if(categorias.length > 0) {
          this.defaultCategoria = categorias[0];
          this.nodeSelected = {
            label: categorias[0].nombre,
            data: categorias[0].id
          }
        }

        for(let categoria of categorias) {
          this.nodes.push({ label: categoria.nombre, data: categoria.id });
        }
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
            title: 'Error al acceder',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    });

  }


  save(event: any) {
    console.log(this.nodeSelected.data);
    this.producto.categoria = {
      id: 0,
      nombre: ""
    }
    this.producto.categoria.id = this.nodeSelected.data;
    this.producto.categoria.nombre = this.nodeSelected.label;

    if(this.action === "crear") {
      this.productoService.save(this.authService.token, this.producto, this.imagen).subscribe({
        next: (producto) => {
          this.productos = [...this.productos, producto];
          this.producto = {};

          this.saveOrUpdateDialog = false;
  
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto creado correctamente',
            showConfirmButton: false,
            timer: 1500
          })

          event.target.reset();


        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "Error al guardar el producto",
            showConfirmButton: false,
            timer: 1500
          })

        }
      })
    } else {
      this.producto.categoria.nombre = this.nodeSelected.label;
      console.log(this.producto);
      this.productoService.update(this.authService.token, this.producto, this.imagen).subscribe({
        next: (producto) => {
          let index: number = this.productos.findIndex(element => element.id == producto.id);
          this.productos[index] = producto;
          this.saveOrUpdateDialog = false;

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          
          event.target.reset();

        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "Error al actualizar el producto",
            showConfirmButton: false,
            timer: 1500
          })
        }
      });

    }


  }

  onSelect(event: any) {

  }

  restore(id: number) {
    Swal.fire({
      title: '¿Seguro que quieres habilitar el producto?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Habilitar',
      denyButtonText: `Cancelar`,
    }).then((result) => {

      if (result.isConfirmed) {

        this.productoService.changeState(this.authService.token, id, "A").subscribe({
          next: (response) => {
            let index: number = this.productos.findIndex( element => element.id == id );
            this.productos.splice(index, 1);
            this.productos = [...this.productos];

            Swal.fire('Deshabilitado correctamente', '', 'success')
          },
          error: (err) => {
            Swal.fire('Error al deshabilitar el producto ')
          }
        })

        
        
      } else if (result.isDenied) {
        Swal.fire('Accion cancelada')
      }
    })

  }

  processFile(event: any) {
    this.imagen = event.target.files[0];
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Seguro que quieres deshabilitar el producto?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Deshabilitar',
      denyButtonText: `Cancelar`,
    }).then((result) => {

      if (result.isConfirmed) {

        this.productoService.delete(this.authService.token,  id).subscribe({
          next: (response) => {
            let index: number = this.productos.findIndex( element => element.id == id );
            this.productos.splice(index, 1);
            this.productos = [...this.productos];

            Swal.fire('Deshabilitado correctamente', '', 'success')
          },
          error: (err) => {
            Swal.fire('Error al deshabilitar el producto ' + err.message, '', 'error')
          }
        })

        
        
      } else if (result.isDenied) {
        Swal.fire('Accion cancelada')
      }
    })
  }

  showDialog(title: string, id?: number) {
    this.producto = {};
    this.nodeSelected = {
      label: this.defaultCategoria.nombre,
      data: this.defaultCategoria.id
    }
    this.imagen = undefined;

    this.dialogTitle = title + " producto";
    this.saveOrUpdateDialog = true;

    this.producto.id = id != undefined ? id : undefined;

    this.action = title;

     //solo si se actualizara el item
     if(this.producto.id != undefined) {

      this.productoService.getById(this.authService.token, this.producto.id).subscribe({
        next: (producto) => {
          this.producto = producto;
          this.nodeSelected.label = producto.categoria!.nombre;
          this.nodeSelected.data = producto.categoria!.id;
          this.nodeSelected = {...this.nodeSelected};
        },
        error: (err) => {
          console.log(err);
        }

      })

     }
  }

  mostrarProductos() {
    if(!this.mostrarInactivos) {

      this.productoService.getAll().subscribe({
        next: (productos) => {
          this.productos = [...productos];
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al consultar los productos',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })

    } else {
      this.productoService.getInactivos(this.authService.token).subscribe({
        next: (productos) => {
          this.productos = [...productos];
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al consultar los productos',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }


  }

}
