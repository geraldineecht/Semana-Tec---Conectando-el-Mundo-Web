import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesRecommendationsComponent } from './movies-recommendations.component';

describe('MoviesRecommendationsComponent', () => {
  let component: MoviesRecommendationsComponent;
  let fixture: ComponentFixture<MoviesRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesRecommendationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
