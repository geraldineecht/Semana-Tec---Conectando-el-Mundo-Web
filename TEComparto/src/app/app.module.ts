import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { YourSongsListComponent } from './components/your-songs-list/your-songs-list.component';
import { FriendsRecommendationsComponent } from './components/friends-recommendations/friends-recommendations.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MusicComponent } from './music/music.component';
import { BooksComponent } from './books/books.component';
import { MoviesComponent } from './movies/movies.component';
import { YourMoviesListComponent } from './components/your-movies-list/your-movies-list.component';
import { YourBooksListComponent } from './components/your-books-list/your-books-list.component';
import { LoginComponent } from './components/login/login.component';
import { LoginContainerComponent } from './components/login-container/login-container.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddSongComponent,
    YourSongsListComponent,
    MusicComponent,
    BooksComponent,
    MoviesComponent,
    YourMoviesListComponent,
    YourBooksListComponent,
    FriendsRecommendationsComponent,
    HomeComponent,
    LoginComponent,
    LoginContainerComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
