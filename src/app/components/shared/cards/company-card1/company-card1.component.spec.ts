import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCard1Component } from './company-card1.component';

describe('CompanyCard1Component', () => {
  let component: CompanyCard1Component;
  let fixture: ComponentFixture<CompanyCard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyCard1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
