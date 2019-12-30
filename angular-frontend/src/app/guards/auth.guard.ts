import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpHeaderResponse } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import {Router,CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';



@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService:AuthService,private router:Router){}

  canActivate(){
      if(!this.authService.loggedIn()){
          return true;
      }else{
          this.router.navigate(['/login']);
          return false;
      }
  }
}