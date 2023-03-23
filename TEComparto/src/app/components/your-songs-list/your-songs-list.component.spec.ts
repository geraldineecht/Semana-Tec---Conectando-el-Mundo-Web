import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourSongsListComponent } from './your-songs-list.component';

describe('YourSongsListComponent', () => {
  let component: YourSongsListComponent;
  let fixture: ComponentFixture<YourSongsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourSongsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourSongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
