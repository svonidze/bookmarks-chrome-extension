import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookmarkComponent } from "./bookmark.component";
import { BookmarksComponent } from "./bookmarks.component";
import { EventPage } from './eventPage';
import { BookmarksService } from './bookmarks.service';

@NgModule({
  declarations: [
    BookmarkComponent,
    BookmarksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [BookmarksComponent, BookmarksService],
  bootstrap: [BookmarksComponent]
})
export class AppModule { }