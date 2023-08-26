import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from './comments.component';
import { DISQUS_SHORTNAME, DisqusModule } from 'ngx-disqus';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [DisqusModule],
    declarations: [CommentsComponent],
    providers: [
      {
        provide: DISQUS_SHORTNAME,
        useValue: 'ff7e'
      }
    ]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
