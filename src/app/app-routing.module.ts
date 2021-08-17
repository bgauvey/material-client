import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { SettingsRoutingModule } from './settings/settings-routing.module';
import { YardSheetRoutingModule } from './yard-sheet/yard-sheet-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    SettingsRoutingModule,
    YardSheetRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
