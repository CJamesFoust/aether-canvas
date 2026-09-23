import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableSettingsForm } from './table-settings-form';

describe('TableSettingsForm', () => {
  let component: TableSettingsForm;
  let fixture: ComponentFixture<TableSettingsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSettingsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TableSettingsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
