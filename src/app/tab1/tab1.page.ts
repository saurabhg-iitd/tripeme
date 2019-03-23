import { Component, OnInit } from '@angular/core';
import { Location } from "../location";
import { LocationService } from '../location.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  isAdmin:boolean;
  locations: Location[];

  constructor(private locationService: LocationService, private authService:AuthenticationService, private router: Router) { }
  ngOnInit(): void {
    if(localStorage.getItem(this.authService.sessionToken)==null || localStorage.getItem(this.authService.sessionToken)==""){
      this.router.navigate(['login']);
    }else{
      this.isAdmin = JSON.parse(localStorage.getItem(this.authService.sessionToken)).admin;
      this.isAdmin=false;
      console.log("admin: "+this.isAdmin)
      this.getLocations();
    }
    // throw new Error("Method not implemented.");
  }

  getLocations():void{
    // this.trips=[{id:1,name:"Delhi"}];
    this.locationService.getLocations().subscribe(locations => this.locations = locations);
  }

  add(name: string, city:string, state:string,country:string): void {
   
    name = name.trim();
    city = city.trim();
    state =state.trim();
    country = state.trim();
    if (!name) { return; }
    this.locationService.addLocation({ name, city,state,country } as Location)
    .subscribe(location => {
      this.locations.push(location);
    });
  }

  
}
