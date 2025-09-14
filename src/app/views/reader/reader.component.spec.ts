import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReaderComponent } from './reader.component';

describe('ReaderComponent', () => {
  let component: ReaderComponent;
  let fixture: ComponentFixture<ReaderComponent>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ReaderComponent],
      providers: [provideHttpClient()],
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
