import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardpComponent } from './dashboardp/dashboardp.component';

const routes: Routes = [
  {
    path:'dashboardp', component: DashboardpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
