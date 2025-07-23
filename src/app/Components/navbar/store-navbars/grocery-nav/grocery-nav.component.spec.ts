import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryNavComponent } from './grocery-nav.component';

describe('GroceryNavComponent', () => {
  let component: GroceryNavComponent;
  let fixture: ComponentFixture<GroceryNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroceryNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroceryNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
