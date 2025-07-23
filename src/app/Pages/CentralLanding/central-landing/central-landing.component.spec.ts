import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralLandingComponent } from './central-landing.component';

describe('CentralLandingComponent', () => {
  let component: CentralLandingComponent;
  let fixture: ComponentFixture<CentralLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentralLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
