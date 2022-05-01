import { Component } from '@angular/core';
import { AuthService } from './servicios/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio-web';
  isUserLogged: boolean = false;
  

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();  
    
  }
}
