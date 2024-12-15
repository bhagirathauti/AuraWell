import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodTrendsComponent } from './mood-trends.component';

describe('MoodTrendsComponent', () => {
  let component: MoodTrendsComponent;
  let fixture: ComponentFixture<MoodTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodTrendsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoodTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
