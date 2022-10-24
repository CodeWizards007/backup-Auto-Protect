import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssureurComponent } from './constat.component';

describe('AssureurComponent', () => {
  let component: AssureurComponent;
  let fixture: ComponentFixture<AssureurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssureurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssureurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
