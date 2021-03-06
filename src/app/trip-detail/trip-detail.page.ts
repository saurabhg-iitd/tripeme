import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import { ActivatedRoute } from '@angular/router';
import { Image } from '../image';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss'],
})
export class TripDetailPage implements OnInit {
  trip: Trip;
  images: Image[];
  numBookings : number;
  slideOpts = {
    effect: 'flip'
  };
  constructor(private tripService: TripService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getTripDetails();
    // throw new Error("Method not implemented.");
  }
  getTripDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tripService.getTripDetails(id)
      .subscribe(trip => {
        this.trip = trip
        console.log(trip);
        console.log(trip.images);
        this.images = trip.images;
      });
  }
  book():void{
    this.tripService.bookTrip(this.trip.id,this.numBookings).subscribe(trip => this.trip = trip);;
  }

}
