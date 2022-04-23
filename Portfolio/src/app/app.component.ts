import { Component, EventEmitter, Output } from '@angular/core';
import { PersonalData } from './data/PersonalData';
import { PorfolioService } from './servicios/porfolio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'portfolio-web';
  usuario: PersonalData[] = [];
  @Output() onUser: EventEmitter<PersonalData> = new EventEmitter;

  constructor(private porfolioService: PorfolioService) { }

  ngOnInit(): void {
    this.porfolioService.obtenerDatosHeader().subscribe(
      (data: PersonalData[]) => {
        this.usuario = data;
      }
    );
  }
}
