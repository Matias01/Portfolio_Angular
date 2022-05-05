import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalData } from 'src/app/data/PersonalData';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  personalData: PersonalData[] = []
  isUserLogged: Boolean = false;

  personalForm: FormGroup;

  constructor(
    private porfolioService: PorfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.personalForm = this.formBuilder.group({
          id: [''],
          name: ['', [Validators.required]],
          backImage: ['', [Validators.required]],
          image: ['', [Validators.required]],
          position: ['', [Validators.required]],
          company: ['', [Validators.required]],
          school: ['', [Validators.required]],
          facebook: ['', [Validators.required]],
          twitter: ['', [Validators.required]],
          instagram: ['', [Validators.required]],
          ubication: ['', [Validators.required]],
          about: ['', [Validators.required]],
        })
      }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.porfolioService.obtenerDatosHeader().subscribe(
      (data) => {
        this.personalData = data;
      }
    );
  }

  private clearForm() {
    this.personalForm.setValue({
      id: '',
      name: '',
      backImage: '',
      image: '',
      position: '',
      company: '',
      school: '',
      facebook: '',
      twitter: '',
      instagram: '',
      ubication: '',
      about: '',
    })
  }

  private loadForm(personal: PersonalData) {
    this.personalForm.setValue({
      id: personal.id,
      name: personal.name,
      backImage: personal.backImage,
      image: personal.image,
      position: personal.position,
      company: personal.company,
      school: personal.school,
      facebook: personal.facebook,
      twitter: personal.twitter,
      instagram: personal.instagram,
      ubication: personal.ubication,
      about: personal.about,
    })
  }

  onSubmit() {
    let personal: PersonalData = this.personalForm.value;
    if (this.personalForm.get('id')?.value == '') {
      this.porfolioService.guardarNuevaHeader(personal).subscribe(
        (newPersonalData: PersonalData) => {
          this.personalData.push(newPersonalData);
        }
      );
    } else {
      this.porfolioService.modificarHeader(personal).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onEditPersonalData() {
    let personal: PersonalData = this.personalData[0];
    this.loadForm(personal);
  }

  onDeletePersonalData(index: number) {
    let personal: PersonalData = this.personalData[index];
    if (confirm("¿Está seguro que desea borrar el perfil seleccionado?")) {
      this.porfolioService.borrarHeader(personal.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
}
