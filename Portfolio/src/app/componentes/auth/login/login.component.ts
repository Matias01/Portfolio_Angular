import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string = "usuario";
  password: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("Iniciando sesion " + this.usuario + " " + this.password);
  }
}
