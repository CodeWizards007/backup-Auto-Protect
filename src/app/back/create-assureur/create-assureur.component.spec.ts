import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssureurComponent } from './create-assureur.component';

describe('CreateAssureurComponent', () => {
  let component: CreateAssureurComponent;
  let fixture: ComponentFixture<CreateAssureurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssureurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssureurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
