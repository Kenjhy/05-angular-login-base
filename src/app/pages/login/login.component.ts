import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// import { UsuarioModel } from '../../../models/usuario.model';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme= false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm){
    if(form.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'espere por favor...',
    });
    Swal.showLoading();

    this.auth.login(this.usuario)
      .subscribe(resp => {
      console.log(resp);
      Swal.close();
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message,
      });
    });
    // console.log('Imprimir Si el formulario es valido')
    // console.log(this.usuario);
    // console.log(form)

    // this.ceremonia.tipoCeremonia = +this._route.snapshot.paramMap.get('id') === 1 ? "apertura" : "cierre";//1 = apertura, 2 = cierre
    // localStorage.setItem('tipoCeremonia', this.ceremonia.tipoCeremonia);
  }

}
