import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourMoviesListComponent } from './your-movies-list.component';

describe('YourMoviesListComponent', () => {
  let component: YourMoviesListComponent;
  let fixture: ComponentFixture<YourMoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourMoviesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
