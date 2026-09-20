import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiWidget } from './kpi-widget';

describe('KpiWidget', () => {
  let component: KpiWidget;
  let fixture: ComponentFixture<KpiWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
