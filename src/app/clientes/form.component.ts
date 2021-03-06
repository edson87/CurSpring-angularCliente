import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente;
  private titulo: string = "Crear Cliente";
  private errores: String[];

  constructor(private clienteService: ClienteService, private router: Router, private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarCliente();
  }

  create(): void {
    console.log(this.cliente)
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        console.log(cliente);
        this.router.navigate(['/clientes'])
        swal("Nuevo Cliente", `Cliente ${cliente.nombre} creado con exito`, 'success')
        //swal("Nuevo Cliente", `${json.mensaje}: ${json.cliente.nombre}`, 'success')

      },
      err => {
        this.errores = err.error.errors as String[];
        console.error(err.error.errors)
        console.error("Codigo del error "+err.status)
      }
    );
  }

  cargarCliente(): void {
    this.activateRoute.params.subscribe(params => {
      var id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  update(): void{
    console.log(this.cliente)
    this.clienteService.update(this.cliente).subscribe(
      json =>{
        console.log(json);
        this.router.navigate(['/clientes']);
        swal("Nuevo Cliente", `${json.mensaje}: ${json.cliente.nombre}`, 'success')
      }
    );
  }
}
