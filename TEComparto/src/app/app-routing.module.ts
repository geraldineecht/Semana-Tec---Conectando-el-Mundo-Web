import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { YourSongsListComponent } from './components/your-songs-list/your-songs-list.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  { path: '', component: YourSongsListComponent},
  { path: 'movies', component: MoviesComponent},
  { path: 'add-song', component: AddSongComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
