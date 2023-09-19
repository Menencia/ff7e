import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ChaptersComponent } from './views/chapters/chapters.component';
import { HistoryComponent } from './views/history/history.component';
import { TeamComponent } from './views/team/team.component';
import { LinksComponent } from './views/links/links.component';
import { CommentsComponent } from './views/comments/comments.component';
import { ReaderComponent } from './views/reader/reader.component';

const appRoutes: Routes = [
  { path: 'presentation', component: HomeComponent },
  { path: 'chapitres', component: ChaptersComponent },
  { path: 'historique', component: HistoryComponent },
  { path: 'equipe', component: TeamComponent },
  { path: 'liens', component: LinksComponent },
  { path: 'commentaires', component: CommentsComponent },
  { path: 'lecture', component: ReaderComponent },
  { path: '', redirectTo: '/presentation', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true, scrollPositionRestoration: 'enabled' })
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule {}
