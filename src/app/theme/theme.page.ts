import { Component, OnInit } from '@angular/core';
import { Theme } from '../theme';
import { ThemeService } from '../theme.service';
import { AuthenticationService } from '../authentication.service';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GlobalDataService } from '../global-data.service';

// @Component({
//   selector: 'app-theme',
//   templateUrl: './theme.page.html',
//   styleUrls: ['./theme.page.scss'],
// })
@Component({
  template: `
  
  <ion-header class="bar bar-subheader">
  <ion-toolbar>
    <ion-title>Hello</ion-title>
  </ion-toolbar>
  </ion-header>
  <ion-content>
    <form [formGroup]="themeForm" (ngSubmit)="submitForm()">
      <ion-item>
        <ion-label>Name</ion-label>
        <ion-input type="text" formControlName="name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Description</ion-label>
        <ion-textarea formControlName="description"></ion-textarea>
      </ion-item>
      <ion-item>
        <ion-label>Active</ion-label>
        <ion-checkbox formControlName="active"></ion-checkbox>
      </ion-item>


      <ion-button type="submit" [disabled]="!themeForm.valid">Submit</ion-button>
    </form>
    </ion-content>
  `
})

export class ThemePage {
  themes:Theme[];
  theme:Theme;
  themeId:number;
  themeForm : FormGroup;

  constructor( private globalService:GlobalDataService, private formBuilder: FormBuilder,private themeService: ThemeService, private auth: AuthenticationService, private route: ActivatedRoute) {
    this.globalService.setTitle("Create Theme");
    this.themeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      active:[]
    });

    const id = +this.route.snapshot.paramMap.get('id');
    this.themeId=id;


    if(id){
      this.globalService.setTitle("Update Theme");
      of(this.themeService.getTheme(id)
      .subscribe(theme => {
        this.theme=theme;
        this.themeForm.patchValue({
         name: theme.name,
         description: theme.description,
         active:theme.active
        });
      }));
    }

   }

   submitForm(){
    this.theme=this.themeForm.value;
    console.log(this.theme);
    if(this.themeId){
      this.updateTheme();
    }else{
      this.addTheme();
    }

  }


  addTheme(){
    this.themeService.addTheme(this.theme).subscribe((res)=>{
      this.theme=res;
      this.globalService.successToast(this.globalService.getAddSuccessMsg());
    },
    err => {
      var errMsg = (err.message) ? err.message : this.globalService.getErrorMsg();
        this.globalService.failureToast(errMsg);
        console.log(err);
      });
  }

  updateTheme(){
    this.themeService.updateTheme(this.theme,this.themeId).subscribe((res)=>{
      this.theme=res;
      this.globalService.successToast(this.globalService.getUpdateSuccessMsg());
    },
    err => {
      var errMsg = (err.message) ? err.message : this.globalService.getErrorMsg();
        this.globalService.failureToast(errMsg);
        console.log(err);
      });
  }

}
