import { BOOKMARKS } from "./data.constants";

import { Injectable } from '@angular/core';
import { Bookmark } from "./bookmark.component";

@Injectable()
export class BookmarksService {
    bookmarks = BOOKMARKS;
    maxId: number = -1;

    getBookmarks() {
        if(this.maxId == -1)
        {
            this.bookmarks.reverse().forEach(b=>{
                if(this.maxId < b.id)
                    this.maxId = b.id;
            })
        }
        return Promise.resolve(this.bookmarks);
    }

    addBookmark(bookmark: Bookmark) {
        bookmark.id = this.maxId + 1;
        this.bookmarks.push(bookmark);

        this.maxId++;
        return bookmark;
    }

    updateBookmark(bookmarkToUpdate: Bookmark) {
        var index = this.findBookmarkIndexOrThrow(bookmarkToUpdate);
        var bookmark = this.bookmarks[index];
        console.log("updating ", bookmarkToUpdate, bookmark);

        //TODO this works??
        bookmark = bookmarkToUpdate;
    }

    deleteBookmark(bookmark: Bookmark) {
        var index = this.findBookmarkIndexOrThrow(bookmark);

        this.bookmarks.splice(index, 1);
    }

    private findBookmarkIndexOrThrow(bookmark: Bookmark): number {
        var index = this.bookmarks.findIndex(b => b.id == bookmark.id);
        if (index == -1) {
            throw "Bookmark ${bookmark.name} with id=${bookmark.id} could not be found.";
        }
        return index;
    }
}