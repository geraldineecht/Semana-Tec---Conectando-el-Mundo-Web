import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-your-songs-list',
  templateUrl: './your-songs-list.component.html',
  styleUrls: ['./your-songs-list.component.css']
})
export class YourSongsListComponent implements OnInit {
  totalAngularPackages: any;

  constructor(private http: HttpClient) { }

  songsIDs:Array<any> = [];
  songs:Array<Array<string>> = [];
  title = "";
  artist = "";
  album = "";
  genre = "";
  coverart = "";
  userID = environment.userID;
    
  ngOnInit(): void {
    (async() => {
      let promise = await this.get_all_songIDs();
      this.songsIDs = promise.songsIds

      for (let i = 0; i < this.songsIDs.length; i++)
      {
        const headers = { 'X-RapidAPI-Key': '9dd5c28516mshc8a3b7c53552092p123aedjsn4567b5bfb1ff', 'X-RapidAPI-Host': 'shazam.p.rapidapi.com' }
        this.http.get<any>('https://shazam.p.rapidapi.com/songs/get-details?key=' + this.songsIDs[i].songId.toString(), { headers }).subscribe(data => {
        this.totalAngularPackages = data.total;
        console.log(data);
        this.coverart = data.images.coverart;
        this.title = data.title;
        this.artist = data.subtitle;
        this.album = data.sections[0].metadata[0].text;
        this.genre = data.genres.primary;
        this.songs.push([this.coverart, this.title, this.artist, this.album, this.genre, this.songsIDs[i].dateAdded, this.songsIDs[i].songId.toString()]);
      })

      }
    })();
  }

  async get_all_songIDs() : Promise<any>
  {
    return this.http.get<any>('http://localhost:5000/songs/' + this.userID).toPromise()
  }

  
  removeSong(songKey:string)
  {
    var payload = { 
      userId: this.userID,
      id: songKey
    }
    console.log(payload);
    
    (async() => {
      let promise = await this.removeSongFromDatabase(payload);
      console.log(promise)
    })();
  }

  async removeSongFromDatabase(payload: object) : Promise<any>
  {
    let httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    }
    return this.http.post<any>('http://localhost:5000/deleteSong', JSON.stringify(payload), httpOptions).toPromise();
  }
}