import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LinksComponent } from './links.component';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [LinksComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
