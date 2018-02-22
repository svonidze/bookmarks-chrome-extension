import { Component, OnInit, NgZone } from '@angular/core';
import { Bookmark } from './bookmark.component';
import { BookmarkComponent } from './bookmark.component';
import { BookmarksService } from './bookmarks.service';
import { EventPage } from './eventPage';

@Component({
    selector: 'sp-bookmarks',
    templateUrl: './templates/bookmarks.html',
    providers: [BookmarksService]
})
export class BookmarksComponent implements OnInit {
    public bookmarks: Bookmark[];
    public date: number;

    private eventPage: EventPage;

    constructor(private zone: NgZone, private service: BookmarksService) {
        this.date = Date.now();
        this.eventPage = new EventPage(b => this.addBookmark(b));
    }

    ngOnInit(): void {
        this.refreshBookmarksLocally();
    }
    public updateBookmark(b: Bookmark) {
        this.service.updateBookmark(b);
    }

    public deleteBookmark(b: Bookmark) {
        console.log('deleteBookmarks', b)
        // this.bookmarks.splice(i, 1);
        this.service.deleteBookmark(b);

        this.refreshBookmarksLocally();
    }

    private addBookmark(b: Bookmark) {
        console.log(this.date);

        var newBookmark = this.zone.run(() => {
            this.service.addBookmark(b)
        });

        // this.refreshBookmarksLocally();
        return newBookmark;
    }

    private refreshBookmarksLocally() {
        this.service.getBookmarks().then(bs => {
            console.log("got bookmarks", bs);

            // if (this.bookmarks == undefined) {
            //     console.log("local bookmarks is undefined", bs);
            //     this.bookmarks = bs;
            //     return;
            // }

            this.zone.run(() => this.bookmarks = bs);
            // TODO reimplement it more elegant
            // this.bookmarks = bs; does not work

            // TODO handle deletion
            // bs.forEach(b => {
            //     let bookmark = this.bookmarks.find(x => x.id == b.id);
            //     if (bookmark == undefined) {
            //         console.log("syncing. new value detected");
            //         this.bookmarks.push(b);
            //     }
            //     else if (bookmark == b) {
            //         console.log("syncing. bookmark ${b.name} has not been changed")
            //     }
            //     else {
            //         console.log("syncing. modififed value detected")

            //         b.id = bookmark.id;
            //         b.name = bookmark.name;
            //         b.url = bookmark.url;
            //     }
            // });

        });
    }
}