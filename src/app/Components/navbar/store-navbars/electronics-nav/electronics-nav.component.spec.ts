import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsNavComponent } from './electronics-nav.component';

describe('ElectronicsNavComponent', () => {
  let component: ElectronicsNavComponent;
  let fixture: ComponentFixture<ElectronicsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectronicsNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectronicsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
