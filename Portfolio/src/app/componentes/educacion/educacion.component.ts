import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Educacion } from 'src/app/data/Educacion';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList: Educacion[] = []
  isUserLogged: Boolean = false;

  educationForm: FormGroup;

  constructor(
    private porfolioService: PorfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.educationForm = this.formBuilder.group({
          id: [''],
          school: ['', [Validators.required]],
          title: ['', [Validators.required]],
          score: ['', [Validators.required]],
          img: ['', [Validators.required]],
          career: ['', [Validators.required]],
          start: ['', [Validators.required]],
          end: ['', [Validators.required]],
        })
      }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.porfolioService.obtenerDatosEducacion().subscribe(
      (data) => {
        this.educacionList = data;
      }
    );
  }

  private clearForm() {
    this.educationForm.setValue({
      id: '',
      school: '',
      title: '',
      score: 0,
      img: '',
      career: '',
      start: '',
      end: '',
    })
  }

  private loadForm(educacion: Educacion) {
    this.educationForm.setValue({
      id: educacion.id,
      school: educacion.school,
      title: educacion.title,
      score: educacion.score,
      img: educacion.img,
      career: educacion.career,
      start: educacion.start,
      end: educacion.end,
    })
  }

  onSubmit() {
    let educacion: Educacion = this.educationForm.value;
    if (this.educationForm.get('id')?.value == '') {
      this.porfolioService.guardarNuevaEducacion(educacion).subscribe(
        (newEducation: Educacion) => {
          this.educacionList.push(newEducation);
        }
      );
    } else {
      this.porfolioService.modificarEducacion(educacion).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewEducation() {
    this.clearForm();
  }

  onEditEducation(index: number) {
    let educacion: Educacion = this.educacionList[index];
    this.loadForm(educacion);
  }

  onDeleteEducation(index: number) {
    let educacion: Educacion = this.educacionList[index];
    if (confirm("¿Está seguro que desea borrar la educación seleccionada?")) {
      this.porfolioService.borrarEducacion(educacion.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}
