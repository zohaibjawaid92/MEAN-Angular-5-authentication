import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {


  authToken:any;
  user:any;
  

  constructor(private http: HttpClient,public jwth: JwtHelperService) { }

  registerUser(user){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post('http://localhost:3000/users/register',user,{headers:headers});

  }
  authenticateUser(user){
   let headers = new HttpHeaders({
    'Content-Type':'application/json'
  });
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers});

  }

  getProfile(){
    this.loadToken();
    let headers = new  HttpHeaders({
      'Authorization':this.authToken,
      'Content-Type':'application/json'
    });
     console.log(this.authToken) 
    return this.http.get('http://localhost:3000/users/profile',{headers:headers});
  }

  //lets use localstoreage to remember data
  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }
  
  loadToken(){
    var token = localStorage.getItem('id_token');
    this.authToken = token;
   }

   loggedIn(){
     this.loadToken();
       return this.jwth.isTokenExpired();
    // this.jwtHelper.isTokenExpired(this.authToken);
     // tokenNotExpired();
   }

  //get logout and clear data
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
