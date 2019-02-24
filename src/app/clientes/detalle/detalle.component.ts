import { Component, OnInit,Input } from '@angular/core';
import { Cliente } from "../cliente";
import { ClienteService } from "../cliente.service";
import { ActivatedRoute, Router } from "@angular/router";
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http'
import { ModalService } from './modal.service';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  private fotoSeleccionada: File;
  progreso: number = 0;

  constructor(private clienteService: ClienteService, private activateRoute: ActivatedRoute,
              private router: Router, private modalService: ModalService) { }

  ngOnInit() {
    console.log(this.cliente)
    console.log(this.modalService.modal)
    /*this.activateRoute.paramMap.subscribe(params =>{
      let id: number = +params.get('id');

      if (id){
        //console.log("Entro")
        this.clienteService.getCliente(id).subscribe(cliente =>{
          this.cliente = cliente as Cliente;
         // console.log("Cliente: "+JSON.stringify(this.cliente));
        })
      }
    });*/
  }

  private seleccionarFoto(event){
        this.fotoSeleccionada = event.target.files[0];
        this.progreso = 0;
        console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0){
      swal("Error :", `El archivo no es una imagen`, "error");
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    console.log("entro")
    if (!this.fotoSeleccionada){
      swal("Error: ", `Debe seleccionar una imagen`, "error");
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(/*cliente => {
          this.cliente = cliente;
          swal("La foto se subio con exito", `La foto se subio correctamente ${this.cliente.foto}`, "success");
          //this.router.navigate(['/clientes'])*/
            event =>{
              if (event.type === HttpEventType.UploadProgress){
                this.progreso = Math.round((event.loaded / event.total)*100);
              }else if (event.type === HttpEventType.Response){
                let response: any = event.body;
                this.cliente = response.cliente as Cliente;
                console.log(this.cliente)
                this.modalService.notificarUpload.emit(this.cliente)
                swal("La foto se subio con exito", response.mensaje, "success");
              }
        })
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
