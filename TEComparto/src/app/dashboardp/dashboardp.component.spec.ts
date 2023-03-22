import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpComponent } from './dashboardp.component';

describe('DashboardpComponent', () => {
  let component: DashboardpComponent;
  let fixture: ComponentFixture<DashboardpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
