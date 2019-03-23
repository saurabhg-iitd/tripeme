import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthenticationService } from '../authentication.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          },
          { path: 'trip/location/:id',loadChildren: '../trips/trips.module#TripsPageModule'},
          { path: 'trips', loadChildren: '../trips/trips.module#TripsPageModule' },
          { path: 'trip/:id', loadChildren: '../trip-detail/trip-detail.module#TripDetailPageModule' }
          // { path: 'locations',   loadChildren: './tab1/tab1.module#Tab1PageModule' },
          // { path: 'trip/location/:id',loadChildren: './trips/trips.module#TripsPageModule'},
          // { path: 'trips', loadChildren: './trips/trips.module#TripsPageModule' },
          // { path: 'trip/:id', loadChildren: './trip-detail/trip-detail.module#TripDetailPageModule' },
          // { path: 'theme', loadChildren: './theme/theme.module#ThemePageModule' }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: '../tab4/tab4.module#Tab4PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
  }

