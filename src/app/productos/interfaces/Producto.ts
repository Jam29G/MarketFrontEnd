import { Categoria } from '../../categoria/interfaces/Categoria';
export interface Producto {
  id?:          number;
  nombre?:      string;
  precio?:      number;
  cantidad?:    number;
  estado?:      string;
  imagen?:      string;
  descripcion?: string;
  cantidadPedido?: number;
  categoria?:   Categoria;
}
