import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalDataService } from '../global-data.service';
@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
  trips: Trip[];
  constructor(private tripService: TripService, private route: ActivatedRoute, private router:Router, private globalService:GlobalDataService) {
    this.globalService.setTitle("Trips");
   }
  ngOnInit(): void {
    this.getAlltrips();
    // throw new Error("Method not implemented.");
  }
  getTripsByLocation(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tripService.getTripsByLocationId(id)
      .subscribe(trips => this.trips = trips);    
  }
  getAlltrips(){
    this.tripService.getTrips().subscribe(res=>this.trips=res);
  }
  tripDetails(id:number){
    this.router.navigate(["trip/"+id]);
  }
  addTrip(){
    this.router.navigate(['trip']); 
  }
  
}
