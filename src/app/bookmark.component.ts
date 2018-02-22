import { Component, Input, Output, EventEmitter, Injectable } from '@angular/core';

export interface Bookmark {
    id: number,
    name: string,
    url: string
}

@Injectable()
@Component({
    selector: 'sp-bookmark',
    templateUrl: './templates/bookmark.html',
    // inputs: ['bookmark']
})
export class BookmarkComponent {
    @Input() bookmark: Bookmark;
    submitted = false;
    
    @Output() bookmarksChanged: EventEmitter<any> = new EventEmitter();
    @Output() bookmarkDeleted: EventEmitter<any> = new EventEmitter();

    onDelete(b: Bookmark) {
        console.log('onDelete', b);
        this.submitted = false;
        this.bookmarkDeleted.emit(b);
    }

    onSubmit(b: Bookmark) {
        console.log('onSubmit');
        this.bookmarksChanged.emit(b);
    }
}