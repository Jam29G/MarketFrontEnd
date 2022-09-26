import { Component, OnInit } from '@angular/core';
import { Usuario, Role } from '../../interfaces/Usuario';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../../rol/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuarioComponent implements OnInit {

  public usuarios: Usuario[] = [];

  public usuario: Usuario = {};

  public roles: Role[] = [];

  public selectedRoles: Role[] = [];

  public action: string = "crear";

  public selectedUsuario: Usuario[] = [];

  mostrarInactivos = false;

  dialogTitle: string = "crear"

  saveOrUpdateDialog = false;

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) { }

  ngOnInit(): void {

    this.usuarioService.getAll(this.authService.token, true).subscribe({
      next: (usuarios) => {
        let index = usuarios.findIndex(element => element.id == this.authService.auth.id);
        usuarios.splice(index, 1);
        this.usuarios = usuarios;
        
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
            title: 'Error al obtener los usuarios: ' + + err.error.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }

    })

    this.rolService.getAll(this.authService.token).subscribe({

      next: (roles) => {
        this.roles = roles;
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
            title: 'Error al obtener los roles: ' + err.error.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }

    })
    
  }

  restore(id: number) {
    Swal.fire({
      title: '¿Seguro que quieres habilitar el usuario?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Habilitar',
      denyButtonText: `Cancelar`,
    }).then((result) => {

      if (result.isConfirmed) {

        this.usuarioService.restore(this.authService.token, id).subscribe({
          next: (response) => {
            let index: number = this.usuarios.findIndex( element => element.id == id );
            this.usuarios.splice(index, 1);
            this.usuarios = [...this.usuarios];

            Swal.fire('Habilitado correctamente', '', 'success')
          },
          error: (err) => {
            Swal.fire('Error al Habilitar el producto: ' + err.error.message)
          }
        })

        
        
      } else if (result.isDenied) {
        Swal.fire('Accion cancelada')
      }
    })
  }

  mostrarUsuarios() {
    if(!this.mostrarInactivos) {

      this.usuarioService.getAll(this.authService.token, true).subscribe({
        next: (usuarios) => {
          let index = usuarios.findIndex(element => element.id == this.authService.auth.id);
          usuarios.splice(index, 1);
          this.usuarios = [...usuarios];
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

    } else {
      this.usuarioService.getAll(this.authService.token, false).subscribe({
        next: (usuarios) => {
          this.usuarios = [...usuarios];
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al consultar los usuarios: ' + err.error.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  }

  save(): void {
    
    if(this.selectedRoles.length == 0) {
      return
    }

    this.usuario.roles = [];

    this.selectedRoles.forEach(el => {
      let rol: Role = {}
      rol = this.roles.find(element => element.id == el)!;
      this.usuario.roles?.push(rol);
    })

    
    this.usuarioService.create(this.authService.token, this.usuario).subscribe({
      next: (usuario) => {
        this.usuarios = [...this.usuarios, usuario];
        this.saveOrUpdateDialog = false;
        this.usuario = {};
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'usuario creado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al guardar el usuario: ' + err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }) 
  }

  showDialog(): void {
    this.usuario = {};
    this.dialogTitle = "crear un nuevo usuario";

    this.saveOrUpdateDialog = true;
  }

  delete(id: number): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar el usuario?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {

      if (result.isConfirmed) {

        this.usuarioService.delete(this.authService.token,  id).subscribe({
          next: (response) => {
            let index: number = this.usuarios.findIndex( element => element.id == id );
            this.usuarios.splice(index, 1);
            this.usuarios = [...this.usuarios];

            Swal.fire('Eliminado correctamente', '', 'success')
          },
          error: (err) => {
            Swal.fire('Error al eliminar: ' + err.error.message)
          }
        })

        
        
      } else if (result.isDenied) {
        Swal.fire('Accion cancelada')
      }
    })
  }

}
