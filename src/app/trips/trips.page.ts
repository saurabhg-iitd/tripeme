import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
  trips: Trip[];
  router:Router;
  constructor(private tripService: TripService, private route: ActivatedRoute, router:Router) { 
    this.router=router;
  }
  ngOnInit(): void {
    this.getTripsByLocation();
    // throw new Error("Method not implemented.");
  }
  getTripsByLocation(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tripService.getTripsByLocationId(id)
      .subscribe(trips => this.trips = trips);
  }
  tripDetails(id:number){
    this.router.navigate(["tabs/tab1/trip/"+id]);
  }
}
