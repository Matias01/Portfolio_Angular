import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../data/Educacion';
import { map } from 'rxjs/operators';
import { PersonalData } from '../data/PersonalData';
import { Experiencia } from '../data/Experiencia';
import { Skills } from '../data/Skills';
import { Proyecto } from '../data/Proyecto';
import { config } from '../data/config/Config';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {
  
  constructor(private http: HttpClient) {  }

  // Métodos header y About
  obtenerDatosHeader(): Observable<PersonalData[]> {
    return this.http.get<any>(config.baseUrl + "personalData");
  }

  guardarNuevaHeader(personalData:PersonalData): Observable<PersonalData> {
    return this.http.post<any>(config.baseUrl + "personalData/create", personalData);
  }

  modificarHeader(personalData:PersonalData): Observable<any> {
    return this.http.put<any>(config.baseUrl + "personalData/update", personalData);
  }

  borrarHeader(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "personalData/" + id);
  }

  // Métodos Experiencia
  obtenerDatosExperiencia(): Observable<Experiencia[]> {
    return this.http.get<any>(config.baseUrl + "experiencia");
  }

  guardarNuevaExperiencia(experiencia:Experiencia): Observable<Experiencia> {
    return this.http.post<any>(config.baseUrl + "experiencia/create", experiencia);
  }

  modificarExperiencia(experiencia:Experiencia): Observable<any> {
    return this.http.put<any>(config.baseUrl + "experiencia/update", experiencia);
  }

  borrarExperiencia(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "experiencia/" + id);
  }

  // Métodos educación
  obtenerDatosEducacion(): Observable<Educacion[]> {
    return this.http.get<any>(config.baseUrl + "educacion");
  }

  guardarNuevaEducacion(educacion:Educacion): Observable<Educacion> {
    return this.http.post<any>(config.baseUrl + "educacion/create", educacion);
  }

  modificarEducacion(educacion: Educacion): Observable<any> {
    return this.http.put<any>(config.baseUrl + "educacion/update", educacion);
  }

  borrarEducacion(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "educacion/" + id);
  }

  // Métodos skills
  obtenerDatosSkill(): Observable<Skills[]> {
    return this.http.get<any>(config.baseUrl + "skill");
  }

  guardarNuevaSkill(skill:Skills): Observable<Skills> {
    return this.http.post<any>(config.baseUrl + "skill/create", skill);
  }

  modificarSkill(skill: Skills): Observable<any> {
    return this.http.put<any>(config.baseUrl + "skill/update", skill);
  }

  borrarSkill(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "skill/" + id);
  }

  // Métodos proyectos
  obtenerDatosProyecto(): Observable<Proyecto[]> {
    return this.http.get<any>(config.baseUrl + "proyecto");
  }

  guardarNuevaProyecto(proyecto:Proyecto): Observable<Proyecto> {
    return this.http.post<any>(config.baseUrl + "proyecto/create", proyecto);
  }

  modificarProyecto(proyecto: Proyecto): Observable<any> {
    return this.http.put<any>(config.baseUrl + "proyecto/update", proyecto);
  }

  borrarProyecto(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "proyecto/" + id);
  }

}
