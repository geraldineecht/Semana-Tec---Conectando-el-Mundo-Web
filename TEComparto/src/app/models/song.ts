export class Song {
    _id?: number;
    title: string;
    album: string;
    dateAdded: string;
    duration: number;

    constructor(_title: string, _album: string, _dateAdded: string, _duration: number){
        this.title = _title;
        this.album = _album;
        this.dateAdded = _dateAdded;
        this.duration = _duration;
    }

}