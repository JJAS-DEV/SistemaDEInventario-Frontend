import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaScanerComponent } from './prueba-scaner.component';

describe('PruebaScanerComponent', () => {
  let component: PruebaScanerComponent;
  let fixture: ComponentFixture<PruebaScanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaScanerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaScanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
