import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../usuario/interfaces/Usuario';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }


  usuario: Usuario = {
    correo: "",
    password: ""
  };

  ngOnInit(): void {
    
  }

  login() {
    
    
    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        let payload = JSON.parse(window.atob(response.access_token.split(".")[1]));
        this.authService.auth = payload;
        this.authService.token = response.access_token;
        this.authService.roles = payload.authorities;
        this.authService.isAdmin = this.authService.roles.findIndex( (el) => el == "ROLE_ADMIN" ) != -1 ? true : false;

        if(this.authService.isAdmin) {
          this.router.navigate(['./pedidos'])
          return
        }

        this.router.navigate(['./'])
      },
      error: (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Usuario o contraseña incorrectos',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }) 



  }

}
