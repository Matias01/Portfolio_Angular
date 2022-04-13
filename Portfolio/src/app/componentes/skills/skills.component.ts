import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Skills } from 'src/app/data/Skills';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: Skills[] = []
  @Output() onSkills: EventEmitter<Skills> = new EventEmitter

  constructor( private porfolioService: PorfolioService) { }

  ngOnInit(): void {
    this.porfolioService.obtenerDatosSkills().subscribe(
      (data) =>{
        this.skills = data;
      }
    );
  }

}
