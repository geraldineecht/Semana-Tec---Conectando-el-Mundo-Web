import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-your-songs-list',
  templateUrl: './your-songs-list.component.html',
  styleUrls: ['./your-songs-list.component.css']
})
export class YourSongsListComponent implements OnInit {

  

  constructor() { }

  array:any = [
    {
      id: 1,
      title: 'Alala',
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300
    },
    {
      id: 2,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300
    },
    {
      id: 3,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300
    },
    {
      id: 4,
      title: "Alala",
      album: "Azulejos",
      dateAdded: "2 weeks",
      duration: 300
    }
  ]

  ngOnInit(): void {
  }

}
