import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsSeeMoreComponent } from './electronics-see-more.component';

describe('ElectronicsSeeMoreComponent', () => {
  let component: ElectronicsSeeMoreComponent;
  let fixture: ComponentFixture<ElectronicsSeeMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectronicsSeeMoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectronicsSeeMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
