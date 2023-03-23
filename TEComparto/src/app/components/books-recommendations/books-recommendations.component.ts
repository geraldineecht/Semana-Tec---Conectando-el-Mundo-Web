import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { SlideConfig } from '../models/slide-config/slide-config.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-books-recommendations',
  templateUrl: './books-recommendations.component.html',
  styleUrls: ['./books-recommendations.component.css']
})
export class BooksRecommendationsComponent implements OnInit, AfterViewInit {

  totalAngularPackages: any;

  constructor(private http: HttpClient) { }
  book = "";
  bookTitle = "";
  bookAuthor = "";

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

    console.log(this.dots)
  }

  getItems() {
    return this.items;
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

  searchBook() {
    const headers = { 'X-RapidAPI-Key': 'f31652ae38msh9a6eed1277e8086p159943jsn312a70396978', 'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com' }
    this.http.get<any>('https://book-finder1.p.rapidapi.com/api/search?title=' + this.book, { headers }).subscribe(data => {
        this.totalAngularPackages = data.total;
        this.bookTitle = data.results[0].title;
        this.bookAuthor = data.results[0].authors[0];
        console.log(this.bookTitle);
        console.log(this.bookAuthor);
   })
  }


}

