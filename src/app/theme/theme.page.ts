import { Component, OnInit } from '@angular/core';
import { Theme } from '../theme';
import { ThemeService } from '../theme.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit {
  themes:Theme[];

  constructor(private themeService: ThemeService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getThemes();
  }

  getThemes(): void {
    this.themeService.getThemes()
    .subscribe(themes => this.themes = themes);
  }

  add(name: string, description:string): void {
   
    name = name.trim();
    description = description.trim();
    if (!name) { return; }
    this.themeService.addTheme({ name, description } as Theme)
    .subscribe(theme => {
      this.themes.push(theme);
    });
  }

  // delete(hero: Hero): void {
  //   this.heroes = this.heroes.filter(h => h !== hero);
  //   this.heroService.deleteHero(hero).subscribe();
  // }

}
