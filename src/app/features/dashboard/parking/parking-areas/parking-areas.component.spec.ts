import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingAreasComponent } from './parking-areas.component';

describe('ParkingAreasComponent', () => {
  let component: ParkingAreasComponent;
  let fixture: ComponentFixture<ParkingAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingAreasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
