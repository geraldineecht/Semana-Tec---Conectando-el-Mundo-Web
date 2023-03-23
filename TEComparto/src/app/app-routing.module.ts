import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { YourSongsListComponent } from './components/your-songs-list/your-songs-list.component';
import { MoviesComponent } from './movies/movies.component';
import { YourMoviesListComponent } from './components/your-movies-list/your-movies-list.component';
import { YourBooksListComponent } from './components/your-books-list/your-books-list.component';
import { FriendsRecommendationsComponent } from './components/friends-recommendations/friends-recommendations.component';
import { HomeComponent } from './components/home/home.component';
import { BooksRecommendationsComponent } from './components/books-recommendations/books-recommendations.component';

const routes: Routes = [
  { path: '', component: YourSongsListComponent},
  { path: 'movies', component: MoviesComponent},
  { path: 'moviesList', component: YourMoviesListComponent},
  { path: 'booksList', component: YourBooksListComponent},
  { path: '', component: HomeComponent},
  { path: 'friends-recommendations', component: FriendsRecommendationsComponent},
  { path: 'books-recommendations', component: BooksRecommendationsComponent},
  { path: 'home', component: HomeComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
