import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Experiencia } from 'src/app/data/Experiencia';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienciaList: Experiencia[] = []
  @Output() onExperiencia: EventEmitter<Experiencia> = new EventEmitter;

  constructor(private porfolioService: PorfolioService) { }

  ngOnInit(): void {
    this.porfolioService.obtenerDatosExperiencia().subscribe(
      (data) => {
        this.experienciaList = data;
      }
    );
  }

}
