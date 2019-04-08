import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  private admin:boolean;
  private sessionToken:string="userSession";
  private addSuccessMsg:string="Added Successfully";
  private updateSuccessMsg:string="Updated Sucessfully";
  private errorMsg:string="Some Error Occurred";
  private title:string="10 Journeys";
  private deleteSuccessMsg="Deleted Successfully";


  private apiUrl={
    dev:"http://13.233.142.54:9090/"
  }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE","withCredentials": "true" })
  };

  constructor(private toastController:ToastController) { 
    // this.addSuccessMsg="Added Successfully";
    // this.updateSuccessMsg="Update Suucessfully";
    // this.errorMsg="Some Error Occurred";

  }

  getApiUrl(){
    return this.apiUrl.dev;
  }

  getHttpOptions(){
    return this.httpOptions;
  }
  isAdmin(){
    return JSON.parse(localStorage.getItem(this.sessionToken)).admin;
  }

  getUpdateSuccessMsg(){
    return this.updateSuccessMsg;
  }

  getDeleteSuccessMsg(){
    return this.deleteSuccessMsg;
  }

  getAddSuccessMsg(){
    return this.addSuccessMsg;
  }

  getErrorMsg(){
    return this.errorMsg;
  }

  getTitle(){
    return this.title;
  }
  setTitle(title:string){
    this.title=title;
  }

  async successToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      duration: 2000,
      closeButtonText: 'close'
    });
    toast.present();
  }
  async failureToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      showCloseButton: true,
      position: 'bottom',
      duration: 2000,
      closeButtonText: 'close'
    });
    toast.present();
  }
}
