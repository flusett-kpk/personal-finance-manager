import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPeriodGroupedByCategoriesComponent } from './report-period-grouped-by-categories.component';

describe('ReportPeriodGroupedByCategoriesComponent', () => {
  let component: ReportPeriodGroupedByCategoriesComponent;
  let fixture: ComponentFixture<ReportPeriodGroupedByCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPeriodGroupedByCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPeriodGroupedByCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
