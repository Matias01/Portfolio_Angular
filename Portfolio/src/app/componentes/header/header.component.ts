import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonalData } from 'src/app/data/PersonalData';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  personal: PersonalData[] = []
  @Output() onHeader: EventEmitter<PersonalData> = new EventEmitter;

  constructor(private porfolioService: PorfolioService) { }

  ngOnInit(): void {
    this.porfolioService.obtenerDatosHeader().subscribe(
      (data) => {
        this.personal = data;
      }
    );
  }

  showEditProfileModal(){
    console.log("click")
  }
}
