import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireCard1Component } from './hire-card1.component';

describe('HireCard1Component', () => {
  let component: HireCard1Component;
  let fixture: ComponentFixture<HireCard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireCard1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HireCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
