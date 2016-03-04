// We're importing Angular's "Component" and "OnInit" functions
// from the angular2/core module.
// We're also importing the "Bookmark", the "BookmarkComponent" class from our own bookmark.component, the "ListService" and "EventPage".
import { Component } from 'angular2/core';
import { OnInit } from 'angular2/core';
import { Bookmark } from './bookmark.component';
import { BookmarkComponent } from './bookmark.component';
import { ListService } from './list.service';
import { EventPage } from './eventPage';

// The ListComponent meta data defines the component's selector,
// the url of the template and the directives used in this template.
// The provider meta data reference the ListService we're using to get the data.
@Component({
    selector: 'sp-list',
    templateUrl: './templates/list.html',
    directives: [ BookmarkComponent ],
    providers: [ ListService, EventPage ]
})

export class ListComponent implements OnInit {

  public bookmarks : Array< Object >;

  constructor( private listService : ListService, private eventPage : EventPage ) {}

  // The function "getBookmarkLists" demands the bookmarks asynchronously.
  // When the promise is resolved, the callback function assignes
  // the bookmarks to the component's bookmarks property.
  getBookmarkLists() {
    this.listService.getBookmarks().then( bookmarks => this.bookmarks = bookmarks );
  }

  // The "ngOnInit" function gets called, when the component gets activated.
  ngOnInit() {
    this.getBookmarkLists();
  }

  // setList uses the "ListService" to save the complete list.
  setList() {
    this.listService.setBookmarks( this.bookmarks );
  }

  // The function deletes the bookmark and saves the complete list.
  deleteBookmark( bookmark : Bookmark, i : number ) {
    this.bookmarks.splice( i, 1 );
    this.setList();
  }

}
