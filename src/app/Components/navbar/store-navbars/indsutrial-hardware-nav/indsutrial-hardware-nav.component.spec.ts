import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndsutrialHardwareNavComponent } from './indsutrial-hardware-nav.component';

describe('IndsutrialHardwareNavComponent', () => {
  let component: IndsutrialHardwareNavComponent;
  let fixture: ComponentFixture<IndsutrialHardwareNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndsutrialHardwareNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndsutrialHardwareNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
