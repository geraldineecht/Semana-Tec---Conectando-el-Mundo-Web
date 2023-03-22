import { Component, OnInit } from '@angular/core';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-dashboardp',
  templateUrl: './dashboardp.component.html',
  styleUrls: ['./dashboardp.component.css']
})

export class DashboardpComponent implements OnInit {

  constructor(private music : MusicService) { }

  ngOnInit(): void {
  }

  result :string = "";
  pet : string  = "";

  postCompletition(){

    let myprompt = `${this.pet}`;

    var payload = { 

    }

    this.music.getCompletition()
    .subscribe((data: any) => {
	    //alert(JSON.stringify(data));
	console.log(data);
        this.result = data.choices[0].text;

   });

  }
}
