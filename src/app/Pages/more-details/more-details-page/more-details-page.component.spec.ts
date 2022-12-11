import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailsPageComponent } from './more-details-page.component';

describe('MoreDetailsPageComponent', () => {
  let component: MoreDetailsPageComponent;
  let fixture: ComponentFixture<MoreDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
