import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSitemapComponent } from './main-sitemap.component';

describe('MainSitemapComponent', () => {
  let component: MainSitemapComponent;
  let fixture: ComponentFixture<MainSitemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSitemapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
