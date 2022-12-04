import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertHistoryComponent } from './convert-history.component';

describe('ConvertHistoryComponent', () => {
  let component: ConvertHistoryComponent;
  let fixture: ComponentFixture<ConvertHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
