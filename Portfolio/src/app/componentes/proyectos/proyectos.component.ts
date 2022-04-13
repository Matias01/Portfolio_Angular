import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Proyecto } from 'src/app/data/Proyecto';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectoList: Proyecto[] = []
  @Output() onProyecto: EventEmitter<Proyecto> = new EventEmitter;

  constructor(private porfolioService: PorfolioService) { }

  ngOnInit(): void {
    this.porfolioService.obtenerDatosProyecto().subscribe(
      (data) => {
        this.proyectoList = data;
      }
    );
  }

}
