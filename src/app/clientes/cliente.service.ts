import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente'
import { Observable } from 'rxjs';
import { of, throwError } from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http'
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';
import {forEach} from "@angular/router/src/utils/collection";
//import localES from '@angular/common/locales/es-BO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any>{
    //return of(CLIENTES);
    //return this.http.get<Cliente[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      tap( (response: any) =>{
          //console.log("Recorrido Uno");
          (response.content as Cliente[]).forEach(cliente =>{
           // return console.log(cliente.nombre);
          })
        }
      ),
      map((response: any) => {
                  (response.content as Cliente[]).map( cliente => {
                  cliente.nombre = cliente.nombre.toUpperCase();
                  let dataPipe = new DatePipe('es');
                  cliente.createAt = dataPipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
                  return cliente;
                });
            return response;
          }
      ),
      tap((response: any) =>{

          //console.log("Recorrido dos");
        (response.content as Cliente[]).forEach(cliente =>{
            //console.log(cliente.nombre)
          })
      })

      //return this.http.get(this.urlEndPoint).pipe(
       // map(function (response) {
       //   return response as Cliente[]
        //})
      //);
    );
  }

  create(cliente: Cliente ): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers: this.httpHeaders}).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError(e =>{

        if (e.status == 400){
          console.log("error 400")
          return throwError (e);
        }
        console.log(e.error.mensaje);
        swal(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        console.error(e.error.mensaje);
        swal("Error al editar",e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente,{headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.log(e.error.mensaje);
        swal(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )
  }

  delete(id): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        console.log(e.error.mensaje);
        swal(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{/*Cliente*/
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`,formData, {
      reportProgress: true
    });

    return this.http.request(req);
    /*.pipe(
      map((response: any) =>
        response.cliente as Cliente
      ),
      catchError(e => {
        console.log(e.error.mensaje);
        swal(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )*/
  }

}
