import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})


export class MusicComponent implements OnInit {
  totalAngularPackages: any;

  
  constructor(private http: HttpClient) { }

  apiurl_search = "https://shazam.p.rapidapi.com/search?term=22";
  apiurl_details = "https://shazam.p.rapidapi.com/songs/get-details?key=71865413";
  songKey = "";
  title = "";
  artist = "";
  album = "";
  genre = "";
  coverart = "";
  
  ngOnInit(): void {

    const headers = { 'X-RapidAPI-Key': 'b3bf7bfd40msh1f4622d3466104fp1e8794jsn67d55fb486be', 'X-RapidAPI-Host': 'shazam.p.rapidapi.com' }
    this.http.get<any>(this.apiurl_search, { headers }).subscribe(dataSearch => {
        this.totalAngularPackages = dataSearch.total;
        console.log(dataSearch);
        this.songKey = dataSearch.tracks.hits[0].track.key;
   })

   this.http.get<any>(this.apiurl_details, { headers }).subscribe(data => {
    this.totalAngularPackages = data.total;
    console.log(data);
    this.title = data.title;
    this.artist = data.subtitle;
    this.album = data.sections[0].metadata[0].text;
    this.genre = data.genres.primary;
    this.coverart = data.images.coverart;
    })
  }

  get_all_songs() {
    // Formar el json request

    // Hacer el get a nuestra api
    //result = get_api_interna()

    // Hacer lookup de los ids en la API de canciones
  }

  get_api_interna() {
    // llamar al end point de flask

    return { data: {
      movieIds: [
      {id: "71865413", dateAdded: "2023-22-03"},
      {id: "431969534", dateAdded: "2023-21-03"},
      {id: "558467799", dateAdded: "2023-20-03"},
      {id: "347046149", dateAdded: "2023-19-03"},
      {id: "94560245", dateAdded: "2023-18-03"},
        ]
    } } 
  }
  

}
