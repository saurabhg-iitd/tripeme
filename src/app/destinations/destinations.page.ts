import { Component, OnInit } from '@angular/core';
import { Destination } from '../destination';
import { DestinationService } from '../destination.service';
import {  Router } from '@angular/router';
import { GlobalDataService } from '../global-data.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.page.html',
  styleUrls: ['./destinations.page.scss'],
})
export class DestinationsPage implements OnInit {
  destinations:Destination[]

  constructor(private destinationService:DestinationService,private router:Router,
    private globalService:GlobalDataService
    ) {
    this.globalService.setTitle("Destinations");
   }

  ngOnInit() {
    this.getAllDestinations();
  }
  getAllDestinations(){
    this.destinationService.getAllDestinations().subscribe(res=>this.destinations=res);
  }

  destinationDetails(id:number){
    this.router.navigate(['destination/'+id]);
  }
  addDestination(){
    this.router.navigate(['destination']);
  }

}
