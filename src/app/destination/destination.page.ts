import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Destination } from '../destination';
import { DestinationService } from '../destination.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GlobalDataService } from '../global-data.service';

// @Component({
//   selector: 'app-destination',
//   templateUrl: './destination.page.html',
//   styleUrls: ['./destination.page.scss'],
// })
@Component({
  template: `
  <ion-header class="bar bar-subheader">
  <ion-toolbar>
    <ion-title>Hello</ion-title>
  </ion-toolbar>
  </ion-header>
  <ion-content>
    <form [formGroup]="destinationForm" (ngSubmit)="submitForm()">
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input type="text" formControlName="name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>City</ion-label>
        <ion-input type="text" formControlName="city"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>State</ion-label>
        <ion-input type="text" formControlName="state"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Country</ion-label>
        <ion-input type="text" formControlName="country"></ion-input>
      </ion-item>
      
      <ion-item>
        <ion-label>Active</ion-label>
        <ion-checkbox formControlName="active"></ion-checkbox>
      </ion-item>


      <ion-button type="submit" [disabled]="!destinationForm.valid">Submit</ion-button>
    </form>
    </ion-content>
  `
})
export class DestinationPage {

  destinationForm : FormGroup;
  destination:Destination;
  destinationId:number;
  constructor(private globalService:GlobalDataService, private formBuilder: FormBuilder,private destinationService: DestinationService, private route: ActivatedRoute) {
    this.globalService.setTitle("Create Destination");
    this.destinationForm = this.formBuilder.group({
      name: ['', Validators.required],
      city: [''],
      state: [''],
      country: [''],
      active:false
    });

    const id = +this.route.snapshot.paramMap.get('id');
    this.destinationId=id;


    if(id){
      this.globalService.setTitle("Update Destination");
      of(this.destinationService.getDestination(id)
      .subscribe(destination => {
        this.destination=destination;
        this.destinationForm.patchValue({
         name: destination.name,
         city: destination.city,
         state: destination.state,
         country: destination.country,
         active:destination.active
        });
      }));
    }

   }

   submitForm(){
    this.destination=this.destinationForm.value;
    console.log(this.destination);
    if(this.destinationId){
      this.updateTheme();
    }else{
      this.addTheme();
    }

  }


  addTheme(){
    this.destinationService.addDestination(this.destination).subscribe((res)=>{
      this.destination=res;
      this.globalService.successToast(this.globalService.getAddSuccessMsg());
    },
    err => {
      var errMsg = (err.message) ? err.message : this.globalService.getErrorMsg();
        this.globalService.failureToast(errMsg);
        console.log(err);
      });
  }

  updateTheme(){
    this.destinationService.updateDestination(this.destination,this.destinationId).subscribe((res)=>{
      this.destination=res;
      this.globalService.successToast(this.globalService.getUpdateSuccessMsg());
    },
    err => {
      var errMsg = (err.message) ? err.message : this.globalService.getErrorMsg();
        this.globalService.failureToast(errMsg);
        console.log(err);
      });
  }

}
