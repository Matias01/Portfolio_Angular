import { Component, OnInit } from '@angular/core';
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
  personalData: PersonalData[] = [];

  constructor(private porfolioService: PorfolioService,
              private authService: AuthService) { }

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

  logout(): void {
    this.authService.logout();
    this.isUserLogged = false;
    window.location.reload();
  }

}
