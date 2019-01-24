import { Component, OnInit, Input } from '@angular/core';
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
  public paginador: any;

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.activatedRoute.paramMap.subscribe(params => {
        let page: number = +params.get('page');
        if (!page){
          page = 0;
        }
        this.clienteService.getClientes(page)
          .subscribe((response) => {
              this.clientes = response.content as Cliente[];
              this.paginador = response
           });
      });
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
