import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../trip.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss'],
})
export class TripDetailPage implements OnInit {
  trip: Trip;
  constructor(private tripService: TripService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getTripDetails();
    // throw new Error("Method not implemented.");
  }
  getTripDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tripService.getTripDetails(id)
      .subscribe(trip => this.trip = trip);
  }

}
