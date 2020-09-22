import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mostrarCeremoniaApertura = true;
  public mostrarCeremoniaCierre = true;
  public mostrarAperturaVotaciones = true;
  public mostrarCierreVotaciones = true;

  constructor( 
              private auth: AuthService,
              private router: Router
              ) { }

  ngOnInit() {

  }

  salir(){
    this.auth.logout();//Destrulle tok
    this.router.navigateByUrl('/login');
  }

//   getCeremonia():Heroe[]{
//     return this.heroes;
// }
  

}
