import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { HistoryComponent } from './history/history.component';
import { TeamComponent } from './team/team.component';
import { LinksComponent } from './links/links.component';
import { CommentsComponent } from './comments/comments.component';

import { DisqusModule } from 'ngx-disqus';

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
    DisqusModule.forRoot('ff7e'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
