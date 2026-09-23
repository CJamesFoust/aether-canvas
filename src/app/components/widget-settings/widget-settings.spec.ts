import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetSettings } from './widget-settings';

describe('WidgetSettings', () => {
  let component: WidgetSettings;
  let fixture: ComponentFixture<WidgetSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
