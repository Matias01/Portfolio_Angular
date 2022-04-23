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
    // Actualización opcional para que funcione hacemos una interface de data.json
    // y les ponemos ? para que pueda tomar valores nulos, luego definimos una variable y le asignamos el valor
    // de res del subscribe y decimos que res sea del tipo de la interface Data y ahí podemos reemplazar los valores del json 
    // en los html haciéndolos dinámicos Ver videos desde el 31 o antes

  // Acá definimos la variable del tipo Data.
  // info: Data = {};
  
  constructor(private http: HttpClient) { 


    // this.cargarInfo();
    
  }

    // private cargarInfo() {
    //    this.http.get('assets/data/data.json')
    //        .subscribe( (res: Data) => {
    //          this.info = res;
    //          console.log(res);
    //        });
    // }

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
