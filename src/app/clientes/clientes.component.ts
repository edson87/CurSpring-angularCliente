import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes
    );
  }

  delete(cliente): void{
    this.clienteService.delete(cliente.id).subscribe(
      params =>{
        this.clientes = this.clientes.filter(cli => cli != cliente)
        swal("Cliente Eliminado",`El Cliente ${cliente.nombre} se elimino`, 'success');
      }
    )
  }

}
