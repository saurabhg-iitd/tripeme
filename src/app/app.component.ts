import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { GlobalDataService } from './global-data.service';
import { Title } from '@angular/platform-browser';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title:string = "10 Journeys";
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private globalData: GlobalDataService,
    private titleService:Title,
    private menu:MenuController
  ) {
    this.menu.enable(true, 'first');
    this.menu.open('first');
    this.initializeApp();
  }

  home(){
    this.router.navigate(["home"]);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.title = this.globalData.getTitle();

      // this.authenticationService.authenticationState.subscribe(state => {
      //   console.log("state "+state);
      //   if (state) {
      //     this.router.navigate(['locations']);
      //   } else {
      //     this.router.navigate(['login']);
      //   }
      // });

      // if(localStorage.getItem(this.authenticationService.sessionToken)==null || localStorage.getItem(this.authenticationService.sessionToken)==""){
      //   this.router.navigate(['login']);
      // }



    });
  }
}
