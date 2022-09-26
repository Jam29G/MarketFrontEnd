import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../usuario/interfaces/Usuario';
import { UsuarioService } from '../../../usuario/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: Usuario = {
    roles: [
      {
        id: 2
      }
    ]
  }
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

  }

  register() {
   
    this.usuarioService.createUser(this.usuario).subscribe({
      next: (usuario) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'usuario creado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['./login'])
      },
      error: (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al crear el usuario: ' + err.error.message,
          showConfirmButton: false,
          timer: 2500
        })
        //console.log(err.error.message);
      }
    }) 
  }

}
