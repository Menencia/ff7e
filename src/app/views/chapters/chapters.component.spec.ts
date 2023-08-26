import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChaptersComponent } from './chapters.component';
import { HttpClientModule } from '@angular/common/http';

describe('ChaptersComponent', () => {
  let component: ChaptersComponent;
  let fixture: ComponentFixture<ChaptersComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
    declarations: [ ChaptersComponent ]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
