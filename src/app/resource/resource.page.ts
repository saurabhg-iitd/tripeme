import { Component } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Resource } from '../resource';
import { of } from 'rxjs';
import {  ActivatedRoute } from '@angular/router';
import { GlobalDataService } from '../global-data.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.page.html',
  styleUrls: ['./resource.page.scss'],
})
export class ResourcePage {
  resourceId:number
  resource:Resource

  constructor(private resourceService:ResourceService,private globalService:GlobalDataService, private route: ActivatedRoute) { 
    this.globalService.setTitle("Create Theme");
    
    const id = +this.route.snapshot.paramMap.get('id');
    this.resourceId=id;


    if(id){
      this.globalService.setTitle("Resource");
      of(this.resourceService.getResource(id)
      .subscribe(res => {
        this.resource=res;
      }));
    }

    }

    update(){
        this.resourceService.updateResource(this.resource).subscribe((res)=>{
          console.log(res);
          this.resource=res;
          this.globalService.successToast(this.globalService.getUpdateSuccessMsg());
        },
        err => {
    
          var errMsg = (err.message) ? err.message : this.globalService.getErrorMsg();
            this.globalService.failureToast(errMsg);
            console.log(err);
          })
    }

    delete(){
      this.resourceService.deleteResource(this.resource.id).subscribe(
        (res)=>{
          console.log(res);
          this.globalService.successToast(this.globalService.getDeleteSuccessMsg());
        },
        err => {
    
          var errMsg = (err.message) ? err.message : this.globalService.getErrorMsg();
            this.globalService.failureToast(errMsg);
            console.log(err);
          }
      )

    }


  }

  
