export interface Usuario {
  id?:        number;
  nombre?:    string;
  apellido?:  string;
  correo?:    string;
  direccion?: string;
  password?:  string;
  estado?:    boolean;
  roles?:     Role[];
}

export interface Role {
  id?:     number;
  nombre?: string;
}