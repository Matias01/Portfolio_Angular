import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { PersonalData } from 'src/app/data/PersonalData';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLogged: boolean = false;
  usuario: PersonalData[] = [];
  @Output() onUser: EventEmitter<PersonalData> = new EventEmitter;

  constructor(private porfolioService: PorfolioService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.porfolioService.obtenerDatosHeader().subscribe(
      (data: PersonalData[]) => {
        this.usuario = data;
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.isUserLogged = false;
    window.location.reload();
  }

}
