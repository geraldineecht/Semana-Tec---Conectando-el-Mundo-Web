import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourSongsListComponent } from './components/your-songs-list/your-songs-list.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { FriendsRecommendationsComponent } from './components/friends-recommendations/friends-recommendations.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'add-song', component: AddSongComponent},
  { path: 'friends-recommendations', component: FriendsRecommendationsComponent},
  { path: 'home', component: HomeComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
