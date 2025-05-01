import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainbaseComponent } from './mainbase.component';

describe('MainbaseComponent', () => {
  let component: MainbaseComponent;
  let fixture: ComponentFixture<MainbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainbaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
