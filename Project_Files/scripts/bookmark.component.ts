// To create a component, we need the Angular "Component" function.
// It can be imported from the angular2/core module.
// We also need the Angular functions "Output" and "EventEmitter".
import { Component } from 'angular2/core';
import { Output } from 'angular2/core';
import { EventEmitter } from 'angular2/core';

// We're using an interface to represent a bookmark.
// A single bookmark is now strongly typed:
// it has to have two properties "name" and "url",
// which both must be a string.
export interface Bookmark {
  name : string,
  url : string
}

// A component decorator tells Angular that the "BookmarkComponent" class
// is a component and adds its meta data: the selector and the template.
// Additionally we have to declare an input property,
// because we want to use "[bookmark]" in the list template
// as a data binding target.
@Component({
    selector: 'sp-bookmark',
    templateUrl: './templates/bookmark.html',
    inputs : [ 'bookmark' ]
})

// The "BookmarkComponent" module exports the "BookmarkComponent" class,
// because we will need it in other modules,
// e.g. to create the bookmark list.
export class BookmarkComponent {

  // The bookmark property is of the type "Bookmark",
  // defined in the interface above.
  bookmark : Bookmark;

  // Setting the default value for the "submitted" property.
  submitted = false;

  // Events flow outside the component and therefor need an output property.
  @Output() bookmarkChanged : EventEmitter<any> = new EventEmitter();
  @Output() bookmarkDeleted : EventEmitter<any> = new EventEmitter();

  // Whenever a user clicks on "Done" after editing a bookmark,
  // an event is fired, which indicates that the bookmark was changed.
  // To hide the form, the submitted property is set to false again.
  onSubmit( bookmark : Bookmark ) {
    this.submitted = false;
    this.bookmarkChanged.emit( bookmark );
  }

  // When the "Delete" button was pressed, the event "bookmarkDeleted" will be fired.
  onDelete( bookmark : Bookmark ) {
    this.bookmarkDeleted.emit( bookmark );
  }

}
