import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  totalAngularPackages: any;

  constructor(private http: HttpClient) { }

  movie = "";
  movieid = "";
  movieTitle = "";
  movieYear = "";
  movieCover = "";

  ngOnInit(): void {

  }

  searchMovie() {
    const headers = { 'X-RapidAPI-Key': 'f31652ae38msh9a6eed1277e8086p159943jsn312a70396978', 'X-RapidAPI-Host': 'imdb8.p.rapidapi.com' }
    this.http.get<any>('https://imdb8.p.rapidapi.com/title/v2/find?title=' + this.movie + '&limit=2&sortArg=moviemeter%2Casc', { headers }).subscribe(data => {
        this.totalAngularPackages = data.total;
        console.log(data);
        this.movieid = data.results[0].id.slice(7, -1);
        this.movieTitle = data.results[0].title;
        this.movieYear = data.results[0].year;
        this.movieCover = data.results[0].image.url;
   })
  }

}
