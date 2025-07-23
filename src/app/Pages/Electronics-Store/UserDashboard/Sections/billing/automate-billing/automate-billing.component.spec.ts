import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomateBillingComponent } from './automate-billing.component';

describe('AutomateBillingComponent', () => {
  let component: AutomateBillingComponent;
  let fixture: ComponentFixture<AutomateBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomateBillingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutomateBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
