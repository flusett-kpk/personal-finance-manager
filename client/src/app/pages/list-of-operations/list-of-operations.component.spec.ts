import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfOperationsComponent } from './list-of-operations.component';

describe('ListOfOperationsComponent', () => {
  let component: ListOfOperationsComponent;
  let fixture: ComponentFixture<ListOfOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
