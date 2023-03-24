import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { SlideConfig } from '../models/slide-config/slide-config.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-movies-recommendations',
  templateUrl: './movies-recommendations.component.html',
  styleUrls: ['./movies-recommendations.component.css']
})
export class MoviesRecommendationsComponent implements OnInit, AfterViewInit {

  totalAngularPackages: any;

  constructor(private http: HttpClient) { }
  moviesIDs:Array<any> = this.get_all_movies();
  movies:Array<Array<string>> = [];

  movieTitle = "";
  movieYear = "";
  movieCover = "";

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
    for(let i = 0; i < this.moviesIDs.length; i++)
    {
      const headers = { 'X-RapidAPI-Key': '302e34740bmsh26ad5c3062e5e4ep112a45jsn3d5d0f19afd7', 'X-RapidAPI-Host': 'imdb8.p.rapidapi.com' }
      this.http.get<any>('https://imdb8.p.rapidapi.com/title/v2/find?title=' + this.moviesIDs[i].id + '&limit=2&sortArg=moviemeter%2Casc', { headers }).subscribe(data => {
      this.totalAngularPackages = data.total;
      console.log(data);
      this.movieCover = data.results[0].image.url;
      this.movieTitle = data.results[0].title;
      this.movieYear = data.results[0].year;
      this.movies.push([this.movieCover, this.movieTitle, this.movieYear, this.moviesIDs[i].dateAdded]);
      })

    }
  }

  get_all_movies() {
    return [
      {id: "Game of Thrones", dateAdded: "2023-22-03"},
      {id: "The Whale", dateAdded: "2023-21-03"},
      {id: "Megan Is Missing", dateAdded: "2023-20-03"},
      {id: "Smile", dateAdded: "2023-19-03"},
      {id: "Black Adam", dateAdded: "2023-18-03"},
      {id: "Top Gun", dateAdded: "2023-18-03"},
      {id: "Black Widow", dateAdded: "2023-18-03"},
      {id: "The Avengers", dateAdded: "2023-18-03"},
      {id: "The Batman", dateAdded: "2023-18-03"},
      {id: "Encanto", dateAdded: "2023-18-03"},
      {id: "The Purge", dateAdded: "2023-18-03"},
      {id: "Me Before You", dateAdded: "2023-18-03"},
    ]

  }

  
  getItems() {
    return this.movies;
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

    if(this.slideConfig.autoPlay) this.autoPlay()
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
    console.log("Slide ID" + slideID)
    console.log("activeSlideID" + this.activeSlideID)
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

}
