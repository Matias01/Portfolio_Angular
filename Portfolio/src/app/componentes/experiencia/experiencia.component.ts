import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/data/Experiencia';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienciaList: Experiencia[] = []
  isUserLogged: Boolean = false;
  
  experienciaForm: FormGroup;

  constructor(private porfolioService: PorfolioService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
                this.experienciaForm = this.formBuilder.group({
                  id: [''],
                  position: ['', [Validators.required]],
                  company: ['', [Validators.required]],
                  img: ['', [Validators.required]],
                  mode: ['', [Validators.required]],
                  start: ['', [Validators.required]],
                  end: ['', [Validators.required]],
                  timeElapsed: ['', [Validators.required]],
                  ubicacion: ['', [Validators.required]],
                })
               }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.porfolioService.obtenerDatosExperiencia().subscribe(
      (data) => {
        this.experienciaList = data;
      }
    );
  }

  private clearForm() {
    this.experienciaForm.setValue({
      id: '',
      position: '',
      company: '',
      img: '',
      mode: '',
      start: '',
      end: '',
      timeElapsed: '',
      ubicacion: '',
    })
  }

  private loadForm(experiencia: Experiencia) {
    this.experienciaForm.setValue({
      id: experiencia.id,
      position: experiencia.position,
      company: experiencia.company,
      img: experiencia.img,
      mode: experiencia.mode,
      start: experiencia.start,
      end: experiencia.end,
      timeElapsed: experiencia.timeElapsed,
      ubicacion: experiencia.ubicacion,
    })
  }

  onSubmit() {
    let experiencia: Experiencia = this.experienciaForm.value;
    if (this.experienciaForm.get('id')?.value == '') {
      this.porfolioService.guardarNuevaExperiencia(experiencia).subscribe(
        (newExperiencia: Experiencia) => {
          this.experienciaList.push(newExperiencia);
        }
      );
    } else {
      this.porfolioService.modificarExperiencia(experiencia).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewExperiencia() {
    this.clearForm();
  }

  onEditExperiencia(index: number) {
    let experiencia: Experiencia = this.experienciaList[index];
    this.loadForm(experiencia);
  }

  onDeleteExperiencia(index: number) {
    let experiencia: Experiencia = this.experienciaList[index];
    if (confirm("¿Está seguro que desea borrar la experiencia seleccionada?")) {
      this.porfolioService.borrarExperiencia(experiencia.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}
