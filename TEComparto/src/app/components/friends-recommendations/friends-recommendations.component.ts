import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-friends-recommendations',
  templateUrl: './friends-recommendations.component.html',
  styleUrls: ['./friends-recommendations.component.css']
})
export class FriendsRecommendationsComponent implements OnInit {

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
      id: 5,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300,
      imagePath: "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/e9/30/96/e93096d1-62cf-9dda-d872-9837f0192354/00843930007134.rgb.jpg/400x400cc.jpg"
    }
  ]

  @ViewChild('slider')
  slider!:ElementRef;

  setUpSlider(){
    let ul = this.slider.nativeElement as HTMLElement;
    sliderContainerWidth = ul.clientWidth;
  }

  ngOnInit(): void {
  }

}
