import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { YourSongsListComponent } from './components/your-songs-list/your-songs-list.component';
import { FriendsRecommendationsComponent } from './components/friends-recommendations/friends-recommendations.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSongComponent,
    YourSongsListComponent,
    FriendsRecommendationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
