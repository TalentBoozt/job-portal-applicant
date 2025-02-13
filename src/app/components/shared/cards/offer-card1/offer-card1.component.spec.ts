import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCard1Component } from './offer-card1.component';

describe('OfferCard1Component', () => {
  let component: OfferCard1Component;
  let fixture: ComponentFixture<OfferCard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferCard1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
