import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-your-books-list',
  templateUrl: './your-books-list.component.html',
  styleUrls: ['./your-books-list.component.css']
})
export class YourBooksListComponent implements OnInit {
  totalAngularPackages: any;

  constructor(private http: HttpClient) { }
  booksIDs:Array<any> = [];
  books:Array<Array<string>> = [];

  bookTitle = "";
  bookAuthor = "";
  bookCategory = "";
  bookSummary = "";
  bookCover = "";
  userID = "641c72934016bace838a783b"

  ngOnInit(): void {
    (async() => {
      let promise = await this.get_all_books();
      this.booksIDs = promise.booksIds
      console.log(this.booksIDs);

      for(let i = 0; i < this.booksIDs.length; i++)
      {
        const headers = { 'X-RapidAPI-Key': 'f31652ae38msh9a6eed1277e8086p159943jsn312a70396978', 'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com' }
        this.http.get<any>('https://book-finder1.p.rapidapi.com/api/search?title=' + this.booksIDs[i].bookName, { headers }).subscribe(data => {
        this.totalAngularPackages = data.total;
        console.log(data);
        this.bookCover = data.results[0].published_works[0].cover_art_url;
        this.bookTitle = data.results[0].title;
        this.bookAuthor = data.results[0].authors[0];
        this.bookCategory = data.results[0].categories[0];
        this.bookSummary = data.results[0].summary;
        this.books.push([this.bookCover, this.bookTitle, this.bookAuthor, this.bookCategory, this.bookSummary, this.booksIDs[i].dateAdded,
                        JSON.stringify({bookTitle: this.bookTitle, bookAuthor: this.bookAuthor})]);
        })
      }
    })();
  }

  async get_all_books() : Promise<any>
  {
    return this.http.get<any>('http://localhost:5000/books/' + this.userID).toPromise()
  }

  removeBook(bookInfo: string)
  {
    let bookInfoObject = JSON.parse(bookInfo)
    var payload = { 
      userId: this.userID,
      bookName: bookInfoObject.bookTitle,
      bookAuthor: bookInfoObject.bookAuthor
    }
    console.log(payload);
    
    (async() => {
      let promise = await this.removeBookFromDatabase(payload);
    })();
  }

  async removeBookFromDatabase(payload: object) : Promise<any>
  {
    let httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    }
    return this.http.post<any>('http://localhost:5000/deleteBook', JSON.stringify(payload), httpOptions).toPromise();
  }
}
