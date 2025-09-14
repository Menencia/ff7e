import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChaptersComponent } from './chapters.component';

describe('ChaptersComponent', () => {
  let component: ChaptersComponent;
  let fixture: ComponentFixture<ChaptersComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ChaptersComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
