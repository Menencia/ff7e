import { Routes } from '@angular/router';
import { ChaptersComponent } from './views/chapters/chapters.component';
import { CommentsComponent } from './views/comments/comments.component';
import { HistoryComponent } from './views/history/history.component';
import { HomeComponent } from './views/home/home.component';
import { LinksComponent } from './views/links/links.component';
import { GlossaryComponent } from './views/reader/glossary/glossary.component';
import { ReaderOptionsComponent } from './views/reader/options/options.component';
import { ReaderComponent } from './views/reader/reader.component';
import { TeamComponent } from './views/team/team.component';

export const routes: Routes = [
  { path: 'presentation', component: HomeComponent },
  { path: 'chapitres', component: ChaptersComponent },
  { path: 'historique', component: HistoryComponent },
  { path: 'equipe', component: TeamComponent },
  { path: 'liens', component: LinksComponent },
  { path: 'commentaires', component: CommentsComponent },
  { path: 'lecture/options', component: ReaderOptionsComponent },
  { path: 'lecture/glossary/:word', component: GlossaryComponent },
  { path: 'lecture/:chapter', component: ReaderComponent },
  { path: '', redirectTo: '/presentation', pathMatch: 'full' },
];
