import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skills } from 'src/app/data/Skills';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: Skills[] = []
  isUserLogged: Boolean = false;

  skillForm: FormGroup;

  constructor(
    private porfolioService: PorfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.skillForm = this.formBuilder.group({
          id: [''],
          name: ['', [Validators.required]],
          progress: ['', [Validators.required]],
          confirms: ['', [Validators.required]],
          confirmsNames: ['', [Validators.required]],
        })
      }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    
    this.reloadData();
  }

  private reloadData() {
    this.porfolioService.obtenerDatosSkill().subscribe(
      (data) => {
        this.skills = data;
      }
    );
  }

  private clearForm() {
    this.skillForm.setValue({
      id: '',
      name: '',
      progress: '',
      confirms: '',
      confirmsNames: '',
    })
  }

  private loadForm(skill: Skills) {
    this.skillForm.setValue({
      id: skill.id,
      name: skill.name,
    })
  }

  onSubmit() {
    let skill: Skills = this.skillForm.value;
    if (this.skillForm.get('id')?.value == '') {
      this.porfolioService.guardarNuevaSkill(skill).subscribe(
        (newSkill: Skills) => {
          this.skills.push(newSkill);
        }
      );
    } else {
      this.porfolioService.modificarSkill(skill).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewSkill() {
    this.clearForm();
  }

  onEditSkill(index: number) {
    let skill: Skills = this.skills[index];
    this.loadForm(skill);
  }

  onDeleteSkill(index: number) {
    let skill: Skills = this.skills[index];
    if (confirm("¿Está seguro que desea borrar la habilidad seleccionada?")) {
      this.porfolioService.borrarSkill(skill.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}
