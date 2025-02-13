import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltWithComponent } from './built-with.component';

describe('BuiltWithComponent', () => {
  let component: BuiltWithComponent;
  let fixture: ComponentFixture<BuiltWithComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuiltWithComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuiltWithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
