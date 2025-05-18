import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesproductosComponent } from './detallesproductos.component';

describe('DetallesproductosComponent', () => {
  let component: DetallesproductosComponent;
  let fixture: ComponentFixture<DetallesproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesproductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
