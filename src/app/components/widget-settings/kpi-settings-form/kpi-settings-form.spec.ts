import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiSettingsForm } from './kpi-settings-form';

describe('KpiSettingsForm', () => {
  let component: KpiSettingsForm;
  let fixture: ComponentFixture<KpiSettingsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiSettingsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiSettingsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
