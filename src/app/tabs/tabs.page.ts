import { Component } from '@angular/core';
import { DestinationService } from '../destination.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isAdmin:boolean
  constructor(private destinationService: DestinationService, private authService:AuthenticationService, private router: Router) { }
  ngOnInit(): void {
    if(localStorage.getItem(this.authService.sessionToken)==null || localStorage.getItem(this.authService.sessionToken)==""){
      this.router.navigate(['login']);
    }else{
      this.isAdmin=JSON.parse(localStorage.getItem(this.authService.sessionToken)).admin;
    }
    // throw new Error("Method not implemented.");
  }
}
