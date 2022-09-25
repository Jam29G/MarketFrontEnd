import { Producto } from 'src/app/productos/interfaces/Producto';
import { Usuario } from 'src/app/usuario/interfaces/Usuario';
export interface Pedido {
  id?:             number;
  estado?:         string;
  fechaPedido?:    Date;
  fechaEntrega?:   null;
  monto?:          number;
  usuario?:        Usuario;
  detallesPedido?: DetallesPedido[];
}

export interface DetallesPedido {
  id?:             number;
  cantidad?:       number;
  precioUnitario?: number;
  producto?:       Producto;
}



