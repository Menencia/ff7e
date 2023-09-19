import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderComponent } from './reader.component';
import { HttpClientModule } from '@angular/common/http';

describe('LinksComponent', () => {
  let component: ReaderComponent;
  let fixture: ComponentFixture<ReaderComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    declarations: [ReaderComponent]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
