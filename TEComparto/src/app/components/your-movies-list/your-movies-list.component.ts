import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-your-movies-list',
  templateUrl: './your-movies-list.component.html',
  styleUrls: ['./your-movies-list.component.css']
})
export class YourMoviesListComponent implements OnInit {
  totalAngularPackages: any;

  constructor(private http: HttpClient) { }
  moviesIDs:Array<any> = this.get_all_movies();
  movies:Array<Array<string>> = [];

  movieTitle = "";
  movieYear = "";
  movieCover = "";

  ngOnInit(): void {
    for(let i = 0; i < this.moviesIDs.length; i++)
    {
      const headers = { 'X-RapidAPI-Key': '302e34740bmsh26ad5c3062e5e4ep112a45jsn3d5d0f19afd7', 'X-RapidAPI-Host': 'imdb8.p.rapidapi.com' }
      this.http.get<any>('https://imdb8.p.rapidapi.com/title/v2/find?title=' + this.moviesIDs[i].id + '&limit=2&sortArg=moviemeter%2Casc', { headers }).subscribe(data => {
      this.totalAngularPackages = data.total;
      console.log(data);
      this.movieCover = data.results[0].image.url;
      this.movieTitle = data.results[0].title;
      this.movieYear = data.results[0].year;
      this.movies.push([this.movieCover, this.movieTitle, this.movieYear, this.moviesIDs[i].dateAdded]);
      })

    }
  }


  get_all_movies() {
    return [
      {id: "Creed III", dateAdded: "2023-22-03"},
      {id: "The Hangover", dateAdded: "2023-21-03"},
      {id: "Toy Story", dateAdded: "2023-20-03"},
      {id: "Monsters, Inc.", dateAdded: "2023-19-03"},
      {id: "Project X", dateAdded: "2023-18-03"},
    ]

  }

}
