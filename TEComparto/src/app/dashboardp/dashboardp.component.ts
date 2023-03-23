import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardp',
  templateUrl: './dashboardp.component.html',
  styleUrls: ['./dashboardp.component.css']
})

export class DashboardpComponent implements OnInit {
  totalAngularPackages: any;

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    const headers = { 'X-RapidAPI-Key': 'f31652ae38msh9a6eed1277e8086p159943jsn312a70396978', 'X-RapidAPI-Host': 'imdb8.p.rapidapi.com' }
    this.http.get<any>('https://imdb8.p.rapidapi.com/title/v2/find?title=Hustle&limit=5&sortArg=moviemeter,asc', { headers }).subscribe(data => {
        this.totalAngularPackages = data.total;
        console.log(data);
   })
  }

}