import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResponsableComponent } from './create-responsable.component';

describe('CreateResponsableComponent', () => {
  let component: CreateResponsableComponent;
  let fixture: ComponentFixture<CreateResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateResponsableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
