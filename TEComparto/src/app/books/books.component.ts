import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  totalAngularPackages: any;

  constructor(private http: HttpClient) { }

  book = "";
  bookTitle = "";
  bookAuthor = "";
  bookCategory = "";
  bookSummary = "";
  bookCover = "";



  ngOnInit(): void {
    
  }

  searchBook() {
    const headers = { 'X-RapidAPI-Key': 'f31652ae38msh9a6eed1277e8086p159943jsn312a70396978', 'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com' }
    this.http.get<any>('https://book-finder1.p.rapidapi.com/api/search?title=' + this.book, { headers }).subscribe(data => {
        this.totalAngularPackages = data.total;
        console.log(data);
        this.bookTitle = data.results[0].title;
        this.bookAuthor = data.results[0].authors[0];
        this.bookCategory = data.results[0].categories[0];
        this.bookSummary = data.results[0].summary;
        this.bookCover = data.results[0].published_works[0].cover_art_url;
   })
  }

}
