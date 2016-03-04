///<reference path="chrome/chrome.d.ts" />

import { Injectable } from 'angular2/core';
import { ListService } from './list.service';

@Injectable()

export class EventPage {

  // The event listener should be set when the "EventPage" class is initialized.
  // Therefore we're using the constructor for adding it to the "Chrome.browserAction".
  // To set and get the bookmark lists, we're using the "ListService".
  constructor ( private listService : ListService ) {

    let bookmarkLists : Array< Object >;

    // The "Chrome.browserAction" object throws an error,
    // when it is not available in development mode.
    // This is why we're only logging a message,
    // if it is undefined.
    if ( typeof chrome.browserAction !== 'undefined' ) {
      // The Chrome "browserAction" is responsible for the icon in the Chrome toolbar.
      // Its "onClicked" function gets fired, when the icon was clicked.
      // This is when we're get the latest list of bookmarks from the "ListService"
      // and call the function "getSelectedTab" after the promise is resolved.
      chrome.browserAction.onClicked.addListener( function ( tab ) {
        listService.getBookmarks().then( bookmarkLists => {
          bookmarkLists = bookmarkLists;
          getSelectedTab( bookmarkLists );
        });
      });
    } else {
      console.log( 'EventPage initialized' );
    }

    // The Chrome tabs API gives us access to the current tab
    // and its title and url,
    // which we're using to add a new bookmark
    // and save the list of bookmarks again with the "ListService".
    function getSelectedTab( bookmarkLists ) {
      chrome.tabs.getSelected( null, function ( tab ) {
        let newBookmark : Object = {
          name : tab.title,
          url : tab.url
        };
        bookmarkLists.push( newBookmark );
        listService.setBookmarks( bookmarkLists );
      });
    }
  }

}
