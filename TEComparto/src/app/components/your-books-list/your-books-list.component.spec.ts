import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourBooksListComponent } from './your-books-list.component';

describe('YourBooksListComponent', () => {
  let component: YourBooksListComponent;
  let fixture: ComponentFixture<YourBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourBooksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
