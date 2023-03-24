import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksRecommendationsComponent } from './books-recommendations.component';

describe('BooksRecommendationsComponent', () => {
  let component: BooksRecommendationsComponent;
  let fixture: ComponentFixture<BooksRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksRecommendationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
