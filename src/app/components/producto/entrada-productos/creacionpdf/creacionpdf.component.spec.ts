import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionpdfComponent } from './creacionpdf.component';

describe('CreacionpdfComponent', () => {
  let component: CreacionpdfComponent;
  let fixture: ComponentFixture<CreacionpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionpdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
