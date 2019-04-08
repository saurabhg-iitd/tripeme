import { Component, OnInit } from '@angular/core';
import { Theme } from '../theme';
import { ThemeService } from '../theme.service';
import { Router } from '@angular/router';
import { GlobalDataService } from '../global-data.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.page.html',
  styleUrls: ['./themes.page.scss'],
})
export class ThemesPage implements OnInit {
  themes:Theme[]

  constructor(private themeService:ThemeService, private router:Router,
    private globalService:GlobalDataService
    ) {
    this.globalService.setTitle("Themes");
   }

  ngOnInit() {
    this.getAllThemes();
  }
  getAllThemes(){
    this.themeService.getThemes().subscribe(res=>this.themes=res);
  }

  themeDetails(id:number){
    this.router.navigate(['theme/'+id]);
  }
  addTheme(){
    this.router.navigate(['theme'])
  }

}
