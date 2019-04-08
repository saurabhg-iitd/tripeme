import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DestinationService } from '../destination.service';
import { ThemeService } from '../theme.service';
import { TripService } from '../trip.service';
import { Destination } from "../destination";
import { Theme } from '../theme';
import { of } from 'rxjs';
import { Trip } from '../trip';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalDataService } from '../global-data.service';

// @Component({
//   selector: 'app-trip-form',
//   templateUrl: './trip-form.page.html',
//   styleUrls: ['./trip-form.page.scss'],
// })
@Component({
  template: `
  <ion-header class="bar bar-subheader">
    <ion-toolbar>
      <ion-title>Hello</ion-title>
    </ion-toolbar>
    </ion-header>
    <ion-content>
    <form [formGroup]="tripForm" (ngSubmit)="submitForm()" >
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input type="text" formControlName="name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Description</ion-label>
        <ion-textarea formControlName="description"></ion-textarea>
      </ion-item>

      <ion-item>
        <ion-label>Start Date</ion-label>
        <ion-datetime  formControlName="startDate" display-format="MMM DD, YYYY HH:mm"></ion-datetime>
      </ion-item>
      <ion-item>
        <ion-label>End Date</ion-label>
        <ion-datetime  formControlName="endDate" display-format="MMM DD, YYYY HH:mm"></ion-datetime>
      </ion-item>

      <ion-item>
      <ion-label>Max Booking</ion-label>
      <ion-input type="number"  formControlName="maxBookings"></ion-input>
      </ion-item>
      <ion-item>
      <ion-label>Cost (INR)</ion-label>
      <ion-input type="number"  formControlName="cost"></ion-input>
      </ion-item>
      <ion-item>
      <ion-label>Video Url</ion-label>
      <ion-input type="string"  formControlName="videoUrl"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Destination</ion-label>
        <ion-select placeholder="Select Destination"   formControlName="destination">
          <ion-select-option   *ngFor="let l of destinations; let i=index" [value]="destinations[i]">{{destinations[i].name}}</ion-select-option> 
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>Theme</ion-label>
        <ion-select placeholder="Select Theme"  formControlName="theme">
          <ion-select-option   *ngFor="let t of themes; let i=index"  [value]="themes[i]">{{themes[i].name}}</ion-select-option> 
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>Active</ion-label>
        <ion-checkbox formControlName="active"></ion-checkbox>
      </ion-item>
      <ion-button type="submit" [disabled]="!tripForm.valid">Submit</ion-button >
    </form>
    </ion-content>
  `
})
export class TripFormPage{
  private tripForm : FormGroup;
  private destinations: Destination[];
  private themes : Theme[];
  private tripId: number;
  private errMsg: "some error occured";
  private title:"Trip Form"
  private trip:Trip;

  

  constructor( private formBuilder: FormBuilder, private destinationService: DestinationService,
     private themeService: ThemeService,
      private tripService: TripService,
      private globalService: GlobalDataService,
       private route: ActivatedRoute ) {

        this.globalService.setTitle("Create Trip");
   
    this.tripForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      startDate:[''],
      endDate:[''],
      maxBookings:[''],
      destination:[''],
      theme:[''],
      cost:[''],
      active:false,
      videoUrl:[''],
      startLocation:[''],
      endLocation:['']
    });
    
    const id = +this.route.snapshot.paramMap.get('id');
    this.tripId=id;

    if(id){
      this.globalService.setTitle("Update Trip");
      of(this.tripService.getTripDetails(id)
      .subscribe(trip => {
        this.trip=trip;
        this.tripForm.patchValue({
         name: trip.name,
         description: trip.description,
         startDate:new Date(trip.startDate).toISOString(),
         endDate:new Date(trip.endDate).toISOString(),
         maxBookings:trip.maxBookings,
         destination:trip.destination,
         theme:trip.theme,
         cost:trip.cost,
          active:trip.active,
          videoUrl:trip.videoUrl,
          startLocation:trip.startLocation,
          endLocation:trip.endLocation
        });
        of(this.getThemes());
        of(this.getDestinations());

        console.log(trip);
      }));
    }else{

      of(this.getThemes());
      of(this.getDestinations());
    }
  
  }
  submitForm(){
    this.trip=this.tripForm.value;
    console.log(this.trip);
    if(this.tripId){
      this.updateTrip();
    }else{
      this.addTrip();
    }

  }

  addTrip(){
    this.tripService.addTrip(this.trip).subscribe((res)=>{
      this.trip=res;
      this.globalService.successToast(this.globalService.getAddSuccessMsg());
    },
      err => {
        var errMsg = (err.message) ? err.message : this.globalService.getErrorMsg();
          this.globalService.failureToast(errMsg);
          console.log(err);
        });
  }

  updateTrip(){
    this.tripService.updateTrip(this.trip,this.tripId).subscribe((res)=>{
      console.log(res);
      this.trip=res;
      this.globalService.successToast(this.globalService.getUpdateSuccessMsg());
    },
    err => {

      var errMsg = (err.message) ? err.message : this.globalService.getErrorMsg();
        this.globalService.failureToast(errMsg);
        console.log(err);
      });
  }

  getThemes(){
    this.themeService.getThemes().subscribe(themes=>{
      this.themes=themes
      console.log(this.themes);
      for(var i=0;i<this.themes.length;i++){
        if(this.trip && (this.trip.theme.id==this.themes[i].id)){
          this.tripForm.controls.theme.patchValue(this.themes[i]);
        }
      }
      // this.tripForm.controls.theme.patchValue(this.trip.theme);
    });

  }

  getDestinations(){
    this.destinationService.getAllDestinations().subscribe((destinations) => 
      {
        this.destinations = destinations
        console.log(this.destinations);
        for(var i=0;i<this.destinations.length;i++){
          if(this.trip && (this.trip.destination.id==this.destinations[i].id)){
            this.tripForm.controls.destination.patchValue(this.destinations[i]);
          }
        }
        // this.tripForm.controls.location.patchValue(this.trip.location);
        // this.tripForm.get("")
      })
    
  }

}
