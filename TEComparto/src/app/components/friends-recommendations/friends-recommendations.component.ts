import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { SlideConfig } from '../models/slide-config/slide-config.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friends-recommendations',
  templateUrl: './friends-recommendations.component.html',
  styleUrls: ['./friends-recommendations.component.css']
})

export class FriendsRecommendationsComponent implements OnInit, AfterViewInit {

  totalAngularPackages: any;

  constructor(private http: HttpClient) { }
  song = "";
  songKey = "";
  userId = environment.userID;
  songsRecs:Array<any> = [];
  songs:Array<Array<string>> = [];
  title = "";
  artist = "";
  album = "";
  genre = "";
  coverart = "";

  @Input('items')
  items: any[] = [];

  dots: number[] = [];
  activeSlideID = 1;

  @ContentChild('template')
  template: TemplateRef<any> | undefined;

  @Output('select')
  onSelect: EventEmitter<string> = new EventEmitter<string>()

  @ViewChild('slideContainer')
  slideContainer!: ElementRef;

  @Input('slideConfig')
  slideConfig = new SlideConfig();

  sliderContainerWidth = 0;
  slideWidth = 0;
  elementsToShow = 1;
  sliderWidth = 0;

  sliderMarginLeft = 0;

  isSlidesOver = false;

  @HostListener('window:resize', ['$event'])
  onScreenResize() {
    this.setUpSlider()
  }

  ngOnInit(): void {
    (async() => {
      let promise = await this.get_all_recommendations();
      this.songsRecs = promise.friendRecommendations;
      console.log

      for (let i = 0; i < this.songsRecs.length; i++)
      {
        const headers = { 'X-RapidAPI-Key': '9dd5c28516mshc8a3b7c53552092p123aedjsn4567b5bfb1ff', 'X-RapidAPI-Host': 'shazam.p.rapidapi.com' }
        this.http.get<any>('https://shazam.p.rapidapi.com/songs/get-details?key=' + this.songsRecs[i].songId.toString(), { headers }).subscribe(data => {
        this.totalAngularPackages = data.total;
        this.coverart = data.images.coverart;
        this.title = data.title;
        this.songs.push([this.coverart, this.title, this.songsRecs[i].friendName]);
      })

      }
    })();
  }

  async get_all_recommendations() : Promise<any>
  {
    return this.http.get<any>('http://localhost:5000/get_friend_songs_recommendations?userId=' + this.userId).pipe(retry(3)).toPromise()
  }

  getItems() {
    return this.songs;
  }

  ngAfterViewInit(): void {
    this.setUpSlider()
  }

  setUpSlider() {
    if (window.innerWidth < 900)
      this.elementsToShow = this.slideConfig.breakpoints.sm;
    else if (window.innerWidth < 1300)
      this.elementsToShow = this.slideConfig.breakpoints.md;
    else if (window.innerWidth < 1700)
      this.elementsToShow = this.slideConfig.breakpoints.lg;
    else
      this.elementsToShow = this.slideConfig.breakpoints.xl;

    if (this.items.length < this.elementsToShow) {
      this.elementsToShow = this.items.length;
    }

    this.dots = Array(this.items.length - this.elementsToShow + 1);

    let container = this.slideContainer.nativeElement as HTMLElement;

    this.sliderContainerWidth = container.clientWidth;
    this.slideWidth = this.sliderContainerWidth / this.elementsToShow;
    this.sliderWidth = this.slideWidth * this.items.length + 2000;

    // console.log(this.sliderContainerWidth)
    // console.log(this.sliderWidth)
    // console.log(this.slideWidth)

    if (this.slideConfig.autoPlay) this.autoPlay()
  }

  prev() {
    console.log(this.sliderMarginLeft)
    if (this.sliderMarginLeft === 0) {
      return
    }
    this.activeSlideID--;
    this.sliderMarginLeft = this.sliderMarginLeft + this.slideWidth;
  }

  next() {
    const notShowingElementsCount = this.items.length - this.elementsToShow;
    const possibleMargin = -(notShowingElementsCount * this.slideWidth);
    if (this.sliderMarginLeft <= possibleMargin) {
      this.isSlidesOver = true;
      return
    }
    this.isSlidesOver = false;
    this.activeSlideID++;
    this.sliderMarginLeft = this.sliderMarginLeft - this.slideWidth;
  }

  move(slideID: number) {
    //console.log("Slide ID" + slideID)
    //console.log("activeSlideID" + this.activeSlideID)
    let difference = slideID - this.activeSlideID;
    if (difference > 0) {
      // Next
      for (let index = 0; index < difference; index++) {
        this.next()
      }
    } else if (difference < 0) {
      //prev
      for (let index = 0; index < Math.abs(difference); index++) {
        this.prev()
      }
    }
  }

  autoPlay(){
    setTimeout(() => {
      if(this.isSlidesOver === true){
        this.sliderMarginLeft = this.slideWidth;
      }
      this.next()
      this.autoPlay()
    }, 1000);
  }

  searchSong(){
    // Get song key from external API
    (async() => {
      let promise = await this.getSongKey();
      //this.totalAngularPackages = promise.total;
      this.songKey = promise.tracks.hits[0].track.key;

      (async() => {
        let postToDbPromise = await this.postSongToDatabase();
      })();

      this.song = "";
    })();
  }

  async getSongKey() : Promise<any>
  {
    const headers = { 'X-RapidAPI-Key': '9dd5c28516mshc8a3b7c53552092p123aedjsn4567b5bfb1ff', 'X-RapidAPI-Host': 'shazam.p.rapidapi.com' }
    return this.http.get<any>('https://shazam.p.rapidapi.com/search?term=' + this.song, { headers }).pipe(retry(1)).toPromise()
  }

  async postSongToDatabase() : Promise<any>
  {
    let httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        })
      }

      var payload = { 
        userId: this.userId,
        listType: 'songs',
        songId: this.songKey
      }
      
      return this.http.post<any>('http://localhost:5000/add_song', JSON.stringify(payload), httpOptions).toPromise();
  }

}
