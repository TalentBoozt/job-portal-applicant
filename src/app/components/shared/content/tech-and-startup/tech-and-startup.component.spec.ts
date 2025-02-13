import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechAndStartupComponent } from './tech-and-startup.component';

describe('TechAndStartupComponent', () => {
  let component: TechAndStartupComponent;
  let fixture: ComponentFixture<TechAndStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechAndStartupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechAndStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
