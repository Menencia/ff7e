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

import { YouTubePlayerModule } from '@angular/youtube-player';
import { UiModule } from './shared/ui/ui.module';

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
    YouTubePlayerModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
