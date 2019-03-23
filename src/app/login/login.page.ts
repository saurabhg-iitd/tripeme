import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { UserSession } from "../userSession";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [GooglePlus]
})
export class LoginPage implements OnInit {
  isLoggedIn:boolean = false;
  userSession:UserSession;
  accessToken:string;
  

  constructor(private authService: AuthenticationService,private router: Router) {

  }

  login(){
    // this.isLoggedIn=this.authService.login();
    this.authService.func();
    // this.authService.saveLoginData().subscribe(userSession => this.userSession = userSession);
    // this.router.navigate([`/locations`]);
  }

  logout() {
   this.authService.logout();
  }

  ngOnInit() {
    console.log("logged In:" +this.authService.isLoggedIn);
    if(localStorage.getItem(this.authService.sessionToken)==null || localStorage.getItem(this.authService.sessionToken)==""){
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['']);
    }
  }

}
