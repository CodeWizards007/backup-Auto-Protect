import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertAddComponent } from './expert-add.component';

describe('ExpertAddComponent', () => {
  let component: ExpertAddComponent;
  let fixture: ComponentFixture<ExpertAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
