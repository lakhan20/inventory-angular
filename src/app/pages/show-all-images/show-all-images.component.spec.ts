import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllImagesComponent } from './show-all-images.component';

describe('ShowAllImagesComponent', () => {
  let component: ShowAllImagesComponent;
  let fixture: ComponentFixture<ShowAllImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowAllImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
