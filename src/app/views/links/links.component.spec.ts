import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksComponent } from './links.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [LinksComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi())]
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
