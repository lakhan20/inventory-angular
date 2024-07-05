import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeemoreproductdetailsComponent } from './seemoreproductdetails.component';

describe('SeemoreproductdetailsComponent', () => {
  let component: SeemoreproductdetailsComponent;
  let fixture: ComponentFixture<SeemoreproductdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeemoreproductdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeemoreproductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
