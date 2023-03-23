import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardpComponent } from './dashboardp/dashboardp.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MusicComponent } from './music/music.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardpComponent,
    MusicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
