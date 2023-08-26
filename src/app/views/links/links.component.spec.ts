import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksComponent } from './links.component';
import { HttpClientModule } from '@angular/common/http';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    declarations: [LinksComponent]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
