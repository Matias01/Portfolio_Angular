import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/data/Proyecto';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectoList: Proyecto[] = []
  isUserLogged: Boolean = false;

  proyectoForm: FormGroup;

  constructor(
    private porfolioService: PorfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.proyectoForm = this.formBuilder.group({
          id: [''],
          name: ['', [Validators.required]],
          details: ['', [Validators.required]]
        })
      }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.porfolioService.obtenerDatosProyecto().subscribe(
      (data) => {
        this.proyectoList = data;
      }
    );
  }

  private clearForm() {
    this.proyectoForm.setValue({
      id: '',
      name: '',
      details: '',
    })
  }

  private loadForm(proyecto: Proyecto) {
    this.proyectoForm.setValue({
      id: proyecto.id,
      name: proyecto.name,
      details: proyecto.details,
    })
  }

  onSubmit() {
    let proyecto: Proyecto = this.proyectoForm.value;
    if (this.proyectoForm.get('id')?.value == '') {
      this.porfolioService.guardarNuevaProyecto(proyecto).subscribe(
        (newProyecto: Proyecto) => {
          this.proyectoList.push(newProyecto);
        }
      );
    } else {
      this.porfolioService.modificarProyecto(proyecto).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewProyecto() {
    this.clearForm();
  }

  onEditProyecto(index: number) {
    let proyecto: Proyecto = this.proyectoList[index];
    this.loadForm(proyecto);
  }

  onDeleteProyecto(index: number) {
    let proyecto: Proyecto = this.proyectoList[index];
    if (confirm("¿Está seguro que desea borrar el proyecto seleccionado?")) {
      this.porfolioService.borrarProyecto(proyecto.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}
