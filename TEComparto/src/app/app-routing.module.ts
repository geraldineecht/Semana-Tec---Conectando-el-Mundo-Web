import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { YourSongsListComponent } from './components/your-songs-list/your-songs-list.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { MoviesComponent } from './movies/movies.component';
import { YourMoviesListComponent } from './components/your-movies-list/your-movies-list.component';
import { YourBooksListComponent } from './components/your-books-list/your-books-list.component';

const routes: Routes = [
  { path: '', component: YourSongsListComponent},
  { path: 'movies', component: MoviesComponent},
  { path: 'addSong', component: AddSongComponent},
  { path: 'moviesList', component: YourMoviesListComponent},
  { path: 'booksList', component: YourBooksListComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
