import { Component, OnInit } from '@angular/core';
import { FriendsRecommendationsComponent } from '../friends-recommendations/friends-recommendations.component';
import { YourSongsListComponent } from '../your-songs-list/your-songs-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  songs:any = [
    {
      id: 1,
      title: 'Alala',
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300, 
      imagePath: "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/e9/30/96/e93096d1-62cf-9dda-d872-9837f0192354/00843930007134.rgb.jpg/400x400cc.jpg"
    },
    {
      id: 2,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300,
      imagePath: "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/e9/30/96/e93096d1-62cf-9dda-d872-9837f0192354/00843930007134.rgb.jpg/400x400cc.jpg"
    },
    {
      id: 3,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300,
      imagePath: "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/e9/30/96/e93096d1-62cf-9dda-d872-9837f0192354/00843930007134.rgb.jpg/400x400cc.jpg"
    },
    {
      id: 4,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300,
      imagePath: "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/e9/30/96/e93096d1-62cf-9dda-d872-9837f0192354/00843930007134.rgb.jpg/400x400cc.jpg"
    },
    {
      id: 5,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300,
      imagePath: "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/e9/30/96/e93096d1-62cf-9dda-d872-9837f0192354/00843930007134.rgb.jpg/400x400cc.jpg"
    },
    {
      id: 6,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300,
      imagePath: "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/e9/30/96/e93096d1-62cf-9dda-d872-9837f0192354/00843930007134.rgb.jpg/400x400cc.jpg"
    },
    {
      id: 7,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300,
      imagePath: "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/e9/30/96/e93096d1-62cf-9dda-d872-9837f0192354/00843930007134.rgb.jpg/400x400cc.jpg"
    },
    {
      id: 8,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300,
      imagePath: "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/e9/30/96/e93096d1-62cf-9dda-d872-9837f0192354/00843930007134.rgb.jpg/400x400cc.jpg"
    },
    {
      id: 9,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300,
      imagePath: "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/e9/30/96/e93096d1-62cf-9dda-d872-9837f0192354/00843930007134.rgb.jpg/400x400cc.jpg"
    }
  ]

  ngOnInit(): void {
  }

}
