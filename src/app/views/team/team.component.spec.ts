import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TeamComponent } from './team.component';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TeamComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
