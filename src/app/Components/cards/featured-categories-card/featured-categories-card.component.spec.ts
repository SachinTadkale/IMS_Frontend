import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCategoriesCardComponent } from './featured-categories-card.component';

describe('FeaturedCategoriesCardComponent', () => {
  let component: FeaturedCategoriesCardComponent;
  let fixture: ComponentFixture<FeaturedCategoriesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedCategoriesCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturedCategoriesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
