import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonalData } from 'src/app/data/PersonalData';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  personal: PersonalData[] = []
  @Output() onAcercade: EventEmitter<PersonalData> = new EventEmitter;

  constructor(private porfolioService: PorfolioService) { }

  ngOnInit(): void {
    this.porfolioService.obtenerDatosHeader().subscribe(
      (data) => {
        this.personal = data;
      }
    );
  }
}
