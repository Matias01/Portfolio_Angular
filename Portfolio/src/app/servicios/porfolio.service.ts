import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../data/Educacion';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  constructor(private http: HttpClient) { }

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
}
