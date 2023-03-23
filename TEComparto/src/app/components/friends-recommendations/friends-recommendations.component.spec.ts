import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsRecommendationsComponent } from './friends-recommendations.component';

describe('FriendsRecommendationsComponent', () => {
  let component: FriendsRecommendationsComponent;
  let fixture: ComponentFixture<FriendsRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsRecommendationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
