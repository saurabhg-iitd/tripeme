import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observer } from 'rxjs';
import { Observable, of, from } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from './global-data.service';
import { UserSession } from "./userSession";
import { Router } from '@angular/router';
 
const TOKEN_KEY = 'auth-token';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  TOKEN_KEY = 'auth-token';
  sessionToken = 'userSession';
  authenticationState = new BehaviorSubject(false);
  baseUrl:any;
  httpOptions:any;
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  accessToken:any;

  res:any;

  isLoggedIn:boolean = false;
  userSession:UserSession;
  
 
  constructor(private plt: Platform, private googlePlus: GooglePlus,private http: HttpClient, private globalService: GlobalDataService,private router: Router) { 
    this.baseUrl=globalService.getApiUrl();
    this.httpOptions=globalService.getHttpOptions();
    this.plt.ready().then(() => {
      // this.storage.ready().then(()=>{
        // this.checkToken();
      // });
    });
  }
 
  checkToken() {
    if(localStorage.getItem(this.sessionToken)!=null && localStorage.getItem(this.sessionToken)==""){
      this.authenticationState.next(true);
    }
  }

  googleLogin(){
    return this.googlePlus.login({
      'webClientId':'708238941640-2gk1fqo1fpthkpbghpv3500m07g0r1m2.apps.googleusercontent.com'
    }).then(res=>{console.log(res)
    }).catch(err => console.error(err));
  }
 
  login(): Observable<UserSession>{
    return new Observable((observer) => {
    this.googlePlus.login({
      'webClientId':'708238941640-2gk1fqo1fpthkpbghpv3500m07g0r1m2.apps.googleusercontent.com'
    }).then(res => {
    //  this.res = this.googleLogin();
    //  console.log(this.res);
    // return this.http.post<UserSession>(this.baseUrl+"user/authenticate",this.res);
    
        
        console.log(res);
        console.log(res.accessToken);
        console.log(res.idToken);
        console.log(res.serverAuthCode);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;
        this.accessToken=res.accessToken;

        this.isLoggedIn = true;
        localStorage.setItem('TOKEN_KEY', JSON.stringify(res.accessToken))
        this.authenticationState.next(true);
        

        return this.http.post<UserSession>(this.baseUrl+"user/authenticate",{"idToken":res.idToken});
        // return this.accessToken;
       
        // return this.isLoggedIn;

      })
      .catch(err => {
        console.error(err);
        return this.http.post<UserSession>(this.baseUrl+"user/authenticate",this.res);
      });
    });

    // this.isLoggedIn = true;
    // localStorage.setItem(TOKEN_KEY, "abc");
    // this.authenticationState.next(true);
    // return this.isLoggedIn;
  }
 
  logout() {
    this.googlePlus.logout()
      .then(res => {
        localStorage.removeItem(this.sessionToken);
        this.router.navigate([`/login`]);
      })
      .catch(err => console.error(err));
  
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }


 func(){
   this.googlePlus.login({
    'webClientId':'708238941640-2gk1fqo1fpthkpbghpv3500m07g0r1m2.apps.googleusercontent.com'
  }).then(res=>{
    this.http.post<UserSession>(this.baseUrl+"user/authenticate",{"idToken":res.idToken}).subscribe(
      x=>this.logicPostFuntion(x),
      e=>console.log("error"),
      ()=>console.log("completed")
    );
   
        // this.authenticationState.next(true);
    
   }).catch(err => console.error(err));
 }

 logicPostFuntion(us:UserSession){
  localStorage.setItem(this.sessionToken, JSON.stringify(us));
  this.router.navigate([`/locations`]);
 }

}
