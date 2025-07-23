import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerVendorModalComponent } from './seller-vendor-modal.component';

describe('SellerVendorModalComponent', () => {
  let component: SellerVendorModalComponent;
  let fixture: ComponentFixture<SellerVendorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerVendorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerVendorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
