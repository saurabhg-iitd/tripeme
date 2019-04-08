import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'tabs',  loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'locations',   loadChildren: './tab1/tab1.module#Tab1PageModule' },
  // { path: 'trip/location/:id',loadChildren: './trips/trips.module#TripsPageModule'},
  { path: 'trips', loadChildren: './trips/trips.module#TripsPageModule' },
  // { path: 'trip/:id', loadChildren: './trip-detail/trip-detail.module#TripDetailPageModule' },
  { path: 'theme', loadChildren: './theme/theme.module#ThemePageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'create-trip', loadChildren: './create-trip/create-trip.module#CreateTripPageModule' },
  { path: 'resource', loadChildren: './upload/upload.module#UploadPageModule' },
  { path: 'trip', loadChildren: './trip-form/trip-form.module#TripFormPageModule' },
  { path: 'trip/:id', loadChildren: './trip-form/trip-form.module#TripFormPageModule' },
  { path: 'theme/:id', loadChildren: './theme/theme.module#ThemePageModule' },
  { path: 'destination', loadChildren: './destination/destination.module#DestinationPageModule' },
  { path: 'destination/:id', loadChildren: './destination/destination.module#DestinationPageModule' },
  { path: 'themes', loadChildren: './themes/themes.module#ThemesPageModule' },
  { path: 'destinations', loadChildren: './destinations/destinations.module#DestinationsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'resource/:id', loadChildren: './resource/resource.module#ResourcePageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
