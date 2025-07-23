import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsStoreHomeComponent } from './electronics-store-home.component';

describe('ElectronicsStoreHomeComponent', () => {
  let component: ElectronicsStoreHomeComponent;
  let fixture: ComponentFixture<ElectronicsStoreHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectronicsStoreHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectronicsStoreHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
