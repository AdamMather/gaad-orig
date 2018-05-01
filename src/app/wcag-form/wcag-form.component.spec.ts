import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcagFormComponent } from './wcag-form.component';

describe('WcagFormComponent', () => {
  let component: WcagFormComponent;
  let fixture: ComponentFixture<WcagFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcagFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
