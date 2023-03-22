import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MusicService {

  constructor(private http: HttpClient) { }
  apiURL = 'https://shazam.p.rapidapi.com/search';

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<any> {
  term = term.trim();

  // Add safe, URL encoded search parameter if there is a search term
  const options = term ?
   { params: new HttpParams().set('term', term) } : {};

  return this.http.get<any>(this.apiURL, options)
    .pipe(
      catchError()
    );
}
/*
  //Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key': 'b3bf7bfd40msh1f4622d3466104fp1e8794jsn67d55fb486be',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
    }),
    params: new HttpParams().set('name', term)
  }

  

  getCompletition() : Observable<any> {
    return this.http.get<any>(this.apiURL, this.httpOptions)
    .pipe(
      retry(1),
      //catchError()
    )
  }

*/
}

