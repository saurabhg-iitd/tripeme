import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: 'tabs',  loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'locations',   loadChildren: './tab1/tab1.module#Tab1PageModule' },
  // { path: 'trip/location/:id',loadChildren: './trips/trips.module#TripsPageModule'},
  // { path: 'trips', loadChildren: './trips/trips.module#TripsPageModule' },
  // { path: 'trip/:id', loadChildren: './trip-detail/trip-detail.module#TripDetailPageModule' },
  { path: 'theme', loadChildren: './theme/theme.module#ThemePageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
