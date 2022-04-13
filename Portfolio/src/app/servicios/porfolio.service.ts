import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../data/Educacion';
import { map } from 'rxjs/operators';
import { PersonalData } from '../data/PersonalData';
import { Experiencia } from '../data/Experiencia';
import { Skills } from '../data/Skills';
import { Proyecto } from '../data/Proyecto';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  constructor(private http: HttpClient) { }

  // Métodos header y About
  obtenerDatosHeader(): Observable<PersonalData[]> {
    return this.http.get<any>("./assets/data/personal-data.json").pipe(
      map(res => res.personalData)
    );
  }

  // Métodos Experiencia
  obtenerDatosExperiencia(): Observable<Experiencia[]> {
    return this.http.get<any>("./assets/data/experiencia.json").pipe(
      map(res => res.experience)
    );
  }

  // Métodos educación
  obtenerDatosEducacion(): Observable<Educacion[]> {
    return this.http.get<any>("./assets/data/educacion.json").pipe(
      map(res => res.education)
    );
  }

  deleteEdu(educacion: Educacion): Observable<Educacion>{
    // lo selecciona, pero no lo borra, sino que lo oculta
    return this.http.get<any>("./assets/data/educacion.json").pipe(map(res => res.education.id));
    // return this.http.delete<Educacion>();
  }

  // Métodos skills
  obtenerDatosSkills(): Observable<Skills[]> {
    return this.http.get<any>("./assets/data/aptitudes.json").pipe(
      map(res => res.aptitudes)
    );
  }

  // Métodos proyectos
  obtenerDatosProyecto(): Observable<Proyecto[]> {
    return this.http.get<any>("./assets/data/proyecto.json").pipe(
      map(res => res.achivements)
    );
  }
}
