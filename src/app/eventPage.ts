///<reference path="./scripts/chrome/chrome.d.ts" />

import { Bookmark } from "./bookmark.component";
import { Injectable } from "@angular/core";
import { BookmarksComponent } from "./bookmarks.component";

export class EventPage {
    constructor(addBookmarkFunc: Function) {
        console.log(chrome.browserAction);
        if (typeof chrome.browserAction === 'undefined') {
            console.log('EventPage initialized');
            return;
        }

        chrome.browserAction.onClicked.addListener(tab => {
            chrome.tabs.getSelected(null, tab => {
                console.log(tab);
                let newBookmark = addBookmarkFunc({
                    id: -1,
                    name: tab.title,
                    url: tab.url
                });
                console.log("new bookmark added ", newBookmark);
            })
        });
    }
}