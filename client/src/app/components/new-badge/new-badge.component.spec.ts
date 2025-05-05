import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBadgeComponent } from './new-badge.component';

describe('NewBadgeComponent', () => {
  let component: NewBadgeComponent;
  let fixture: ComponentFixture<NewBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
