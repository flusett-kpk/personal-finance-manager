import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDayByDayComponent } from './report-day-by-day.component';

describe('ReportDayByDayComponent', () => {
  let component: ReportDayByDayComponent;
  let fixture: ComponentFixture<ReportDayByDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDayByDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDayByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
