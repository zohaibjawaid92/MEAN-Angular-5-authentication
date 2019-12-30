import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:String;
  username:String;
  email:String;
  password:String;

  
  constructor(private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
     private router:Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
   const user = {
    name:this.name,
    username:this.username,
    email:this.email,
    password:this.password

   }
   
   if(!this.validateService.validateRegister(user)){
     this.flashMessage.show('please fill all the fields',{cssClass:'alert-danger',timeout:3000});
     return false;
   }
   if(!this.validateService.validateEmail(user.email)){
    console.log('please enter valid email');
    this.flashMessage.show('please enter valid email address',{cssClass:'alert-danger',timeout:3000});
    return false;
  }

   //lets make a post request
   this.authService.registerUser(user).subscribe((data:any) =>{
    if(data.success){
      this.flashMessage.show('You are now registered and can login ',{cssClass:'alert-success',timeout:3000});
      this.router.navigate(['/login']);
    }else{
      this.flashMessage.show('something went wrong please try again ',{cssClass:'alert-danger',timeout:3000});
      this.router.navigate(['/register']);
    }


   });


  }

}
