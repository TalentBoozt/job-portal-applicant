import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearGridComponent } from './year-grid.component';

describe('YearGridComponent', () => {
  let component: YearGridComponent;
  let fixture: ComponentFixture<YearGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
