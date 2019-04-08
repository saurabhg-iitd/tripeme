import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalDataService } from '../global-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router:Router,private globalService:GlobalDataService) {
    this.globalService.setTitle("10 Journeys");
   }

  ngOnInit() {

  }

  navigateToTrip(){
    this.router.navigate(['trips']);
  }

  navigateToTheme(){
    this.router.navigate(['themes']);
  }

  navigateToDestination(){
    this.router.navigate(['destinations']);
  }

  navigateToResource(){
    this.router.navigate(['resource']);
  }

}
