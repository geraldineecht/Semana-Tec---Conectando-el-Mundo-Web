import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-your-songs-list',
  templateUrl: './your-songs-list.component.html',
  styleUrls: ['./your-songs-list.component.css']
})
export class YourSongsListComponent implements OnInit {
  totalAngularPackages: any;

  constructor(private http: HttpClient, private http2: HttpClient) { }

  //apiurl_search = "https://shazam.p.rapidapi.com/search?term=22";
  //apiurl_details = "https://shazam.p.rapidapi.com/songs/get-details?key=71865413";
  songsJSON:Array<any> = [];
  songsIDs:Array<any> = [];
  songs:Array<Array<string>> = [];
  title = "";
  artist = "";
  album = "";
  genre = "";
  coverart = "";
  
  ngOnInit(): void {
    this.songsIDs = this.get_all_songIDs();
    console.log(this.songsIDs);
    this.get_song_details();
    
  }

  get_all_songIDs() {
    // Formar el json request

    // Hacer el get a nuestra api
    //result = get_api_interna();

    this.http2.get<any>('http://localhost:5000/songs/641b97ad0df3d227f1daeb5e').subscribe(data => {
      this.totalAngularPackages = data.total;
      console.log(data.songsIds);
      this.songsJSON = data.songsIds;
      })
      // this.songsJSON = [
      //   {songId: "71865413", dateAdded: "2023-22-03"},
      //   {songId: "431969534", dateAdded: "2023-21-03"},
      //   {songId: "558467799", dateAdded: "2023-20-03"},
      //   {songId: "347046149", dateAdded: "2023-19-03"},
      //   {songId: "94560245", dateAdded: "2023-18-03"},
      //     ];

      return this.songsJSON;


    //return result.data.movieIds;
  }

  get_song_details(){

    for(let i = 0; i < this.songsIDs.length; i++)
    {
      console.log(i);
      const headers = { 'X-RapidAPI-Key': '5bbdd3f1f6mshab3da4d3dd31572p1da8e9jsn5164c0ae80fc', 'X-RapidAPI-Host': 'shazam.p.rapidapi.com' }
    //   this.http.get<any>(this.apiurl_search, { headers }).subscribe(dataSearch => {
    //       this.totalAngularPackages = dataSearch.total;
    //       console.log(dataSearch);
    //       this.songKey = dataSearch.tracks.hits[0].track.key;
    //  })
    this.http.get<any>('https://shazam.p.rapidapi.com/songs/get-details?key=' + this.songsIDs[i].songId.toString(), { headers }).subscribe(data => {
      this.totalAngularPackages = data.total;
      console.log(data);
      this.coverart = data.images.coverart;
      this.title = data.title;
      this.artist = data.subtitle;
      this.album = data.sections[0].metadata[0].text;
      this.genre = data.genres.primary;
      this.songs.push([this.coverart, this.title, this.artist, this.album, this.genre, this.songsIDs[i].dateAdded]);
      })

    }

  }
  

}