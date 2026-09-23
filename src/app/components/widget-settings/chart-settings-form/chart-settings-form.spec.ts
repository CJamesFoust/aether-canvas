import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartSettingsForm } from './chart-settings-form';

describe('ChartSettingsForm', () => {
  let component: ChartSettingsForm;
  let fixture: ComponentFixture<ChartSettingsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSettingsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartSettingsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
