import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Categoria } from '../../interfaces/Categoria';
import { CategoriaService } from '../../services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-categoria',
  templateUrl: './adm-categoria.component.html',
  styleUrls: ['./adm-categoria.component.css']
})
export class AdmCategoriaComponent implements OnInit {

  public categorias: Categoria[] = [];

  public action: string = "";

  public selectedCategorias: Categoria[] = [];

  categoria: Categoria = {}
  
  dialogTitle: string = "";

  saveOrUpdateDialog: boolean = false;



  constructor(private router: Router, private authService: AuthService, private categoriaService: CategoriaService) { }



  ngOnInit(): void {

    this.categoriaService.getAll(this.authService.token).subscribe({
      next: (response) =>{
        this.categorias = response;
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

  save() {

    if(this.action == 'crear') {
      this.categoriaService.create(this.authService.token, this.categoria).subscribe({
        next: (categoria) => {
          this.categorias = [...this.categorias, categoria];
          this.saveOrUpdateDialog = false;
          this.categoria = {};
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Categoria creada correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al guardar la categoria',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(err);
        }
      })
    } else {
      this.categoriaService.update(this.authService.token, this.categoria, this.categoria.id!).subscribe({
        next: (categoria) => {
          let index: number = this.categorias.findIndex( element => element.id == categoria.id );
          this.categorias[index] = categoria;
          this.saveOrUpdateDialog = false;

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Categoria actualizada correctamente',
            showConfirmButton: false,
            timer: 1500
          })

        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al actualizar la categoria',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(err);
        }
      })
        
      
    }
    

  }

  showDialog(message: string, id?: number) {
    this.categoria = {};
    this.dialogTitle = message + " categoria"
    this.action = message;

    this.categoria.id = id != undefined ? id : undefined;
    /*
    if(id != undefined) {
      let idn: number = parseInt(id);
      this.categoria.id = idn;
    } */

    //solo se actualiza el item
    if(this.categoria.id != undefined) {
      this.categoriaService.getById( this.authService.token, this.categoria.id! ).subscribe({
        next: (categoria) => {
          this.categoria.nombre = categoria.nombre;
        },
        error: (err) => {
          console.log("Ocurrio un error", err);
        }
      })
    }

    this.saveOrUpdateDialog = true;
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar la categoria?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {

      if (result.isConfirmed) {

        this.categoriaService.delete(this.authService.token,  id).subscribe({
          next: (response) => {
            let index: number = this.categorias.findIndex( element => element.id == id );
            this.categorias.splice(index, 1);
            this.categorias = [...this.categorias];

            Swal.fire('Eliminado correctamente', '', 'success')
          },
          error: (err) => {
            Swal.fire('Error al eliminar ' + err.message, '', 'error')
          }
        })

        
        
      } else if (result.isDenied) {
        Swal.fire('Accion cancelada')
      }
    })
  }



}
