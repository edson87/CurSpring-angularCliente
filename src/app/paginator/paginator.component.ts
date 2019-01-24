import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() paginador: any;
  paginas: number[];
  inicio: number;
  fin: number;

  constructor( )  { }

  ngOnInit() {
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    console.log(this.paginador);
    let tamaño = this.paginas.length;
    this.inicio=0;
    this.fin = tamaño - 1;
  }

}
