import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Educacion } from 'src/app/data/Educacion';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList: Educacion[] = []
  @Output() onEducacion: EventEmitter<Educacion> = new EventEmitter;

  constructor(private porfolioService: PorfolioService) { }

  ngOnInit(): void {
    this.porfolioService.obtenerDatosEducacion().subscribe(
      (data) => {
        this.educacionList = data;
      }
    );
  }

  showEditEduModal(educacionList: Educacion[]){

  }

  deleteEdu(educacion: Educacion){
    this.porfolioService.deleteEdu(educacion).subscribe( () => (
      this.educacionList = this.educacionList.filter( (t) => (
        t.id !== educacion.id)
      )));
  }

}
