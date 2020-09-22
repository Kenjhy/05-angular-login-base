import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { IfStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyBvbJxcZ1rCWQFm7yFe6vDBT_XqpNhnI3M';
  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    console.log(`${this.url}signInWithPassword?key=${this.apiKey}`);
    console.log(authData);
    
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData
                          ).pipe(
                            map(resp => {
                              console.log('entro en el mapa del RXJS');
                              this.guardarToken(resp['idToken']);
                              return resp;
                            })
                          );

  }

  nuevoUsuario(usuario: UsuarioModel){
    const authData = {
      noIdentificacion: usuario.noIdentificacion,
      email: usuario.email,
      password: usuario.password,
      nombre: usuario.nombre,
      fechaExDocumento: usuario.fechaExDocumento,
      numeroCelular: usuario.numeroCelular,
      returnSecureToken: true
      // ...usuario,
    };
    console.log(`${this.url}signUp?key=${this.apiKey}`);
    console.log(authData);
    
    return this.http.post(`${ this.url }signUp?key=${ this.apiKey }`, authData
                          ).pipe(
                            map(resp => {
                              console.log('entro en el mapa del RXJS');
                              this.guardarToken(resp['idToken']);
                              return resp;
                            })
                          );

  }

  guardarToken(idToken:string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    //Pasa la fecha ex
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }
  
  leerToken(){
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean{

    if(this.userToken.length<2){
      return false;
    }
    //Tiempo expiracion tok
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if(expiraDate>new Date()){
      return true;
    }else{
      return false;
    }
  }

   //Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvbJxcZ1rCWQFm7yFe6vDBT_XqpNhnI3M

  //Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
}
