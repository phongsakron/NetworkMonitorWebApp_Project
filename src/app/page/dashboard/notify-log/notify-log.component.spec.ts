import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyLogComponent } from './notify-log.component';

describe('NotifyLogComponent', () => {
  let component: NotifyLogComponent;
  let fixture: ComponentFixture<NotifyLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
