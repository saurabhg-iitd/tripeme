import { Component, OnInit } from '@angular/core';
import { Destination } from "../destination";
import { DestinationService } from '../destination.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  isAdmin:boolean;
  destinations: Destination[];

  constructor(private destinationService: DestinationService, private authService:AuthenticationService, private router: Router) { }
  ngOnInit(): void {
    if(localStorage.getItem(this.authService.sessionToken)==null || localStorage.getItem(this.authService.sessionToken)==""){
      this.router.navigate(['login']);
    }else{
      this.isAdmin = JSON.parse(localStorage.getItem(this.authService.sessionToken)).admin;
      this.isAdmin=false;
      console.log("admin: "+this.isAdmin)
      this.getDestinations();
    }
    // throw new Error("Method not implemented.");
  }

  getDestinations():void{
    // this.trips=[{id:1,name:"Delhi"}];
    this.destinationService.getTripDestinations().subscribe(res => this.destinations = res);
  }

  add(name: string, city:string, state:string,country:string): void {
   
    name = name.trim();
    city = city.trim();
    state =state.trim();
    country = state.trim();
    if (!name) { return; }
    this.destinationService.addDestination({ name, city,state,country } as Destination)
    .subscribe(res => {
      this.destinations.push(res);
    });
  }

  
}
