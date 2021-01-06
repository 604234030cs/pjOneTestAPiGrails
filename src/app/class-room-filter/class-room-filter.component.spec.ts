import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoomFilterComponent } from './class-room-filter.component';

describe('ClassRoomFilterComponent', () => {
  let component: ClassRoomFilterComponent;
  let fixture: ComponentFixture<ClassRoomFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassRoomFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassRoomFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
