import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableComponent } from './draggable.component';

describe('DraggableComponent', () => {
  let component: DraggableComponent;
  let fixture: ComponentFixture<DraggableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DraggableComponent]
    });
    fixture = TestBed.createComponent(DraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
