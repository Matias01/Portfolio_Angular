import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/data/Company';
import { PersonalData } from 'src/app/data/PersonalData';
import { School } from 'src/app/data/School';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  personalData: PersonalData[] = [];
  companys: Company[] = [];
  schools: School[] = [];
  isUserLogged: Boolean = false;

  personalDataForm: FormGroup;

  constructor(
    private porfolioService: PorfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.personalDataForm = this.formBuilder.group({
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
    this.porfolioService.obtenerCompany().subscribe(
      (data) => {
        this.companys = data;
      }
    );
    this.porfolioService.obtenerSchool().subscribe(
      (data) => {
        this.schools = data;
      }
    );
  }

  private clearForm() {
    this.personalDataForm.setValue({
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
    this.personalDataForm.setValue({
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
    let personal: PersonalData = this.personalDataForm.value;
    if (this.personalDataForm.get('id')?.value == '') {
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

  onEditPersonalData(index: number) {
    let personal: PersonalData = this.personalData[index];
    this.loadForm(personal);
  }

  onEditProfile() {
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

  logout(): void {
    this.authService.logout();
    this.isUserLogged = false;
    window.location.reload();
  }
}
