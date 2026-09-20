import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWidget } from './test-widget';

describe('TestWidget', () => {
  let component: TestWidget;
  let fixture: ComponentFixture<TestWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
