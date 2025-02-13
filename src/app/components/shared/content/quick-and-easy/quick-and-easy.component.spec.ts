import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAndEasyComponent } from './quick-and-easy.component';

describe('QuickAndEasyComponent', () => {
  let component: QuickAndEasyComponent;
  let fixture: ComponentFixture<QuickAndEasyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickAndEasyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickAndEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
