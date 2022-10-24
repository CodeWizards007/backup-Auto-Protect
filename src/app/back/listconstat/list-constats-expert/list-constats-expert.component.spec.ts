import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConstatsExpertComponent } from './list-constats-expert.component';

describe('ListConstatsExpertComponent', () => {
  let component: ListConstatsExpertComponent;
  let fixture: ComponentFixture<ListConstatsExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConstatsExpertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConstatsExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
