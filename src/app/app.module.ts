import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { ChaptersComponent } from './views/chapters/chapters.component';
import { HistoryComponent } from './views/history/history.component';
import { TeamComponent } from './views/team/team.component';
import { LinksComponent } from './views/links/links.component';
import { CommentsComponent } from './views/comments/comments.component';

import { DISQUS_SHORTNAME, DisqusModule } from 'ngx-disqus';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChaptersComponent,
    HistoryComponent,
    TeamComponent,
    LinksComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DisqusModule,
    YouTubePlayerModule
  ],
  providers: [
    {
      provide: DISQUS_SHORTNAME,
      useValue: 'ff7e'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
