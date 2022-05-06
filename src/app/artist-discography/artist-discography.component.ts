import {  Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  
  artist: any;
  albums: Array<any> = [];

  albumTemp: any;
  artistTemp: any;
  route: any;

  constructor(private activatedRoute: ActivatedRoute, private musicService: MusicDataService) {}

  ngOnInit(): void { 
    this.route = this.activatedRoute.params.subscribe(params => {
        this.artistTemp = this.musicService.getArtistById(params['id']).subscribe(artistData => {
            this.artist = artistData;
        });
        this.albumTemp = this.musicService
            .getAlbumsByArtistId(params['id'])
            .subscribe(albumsData => {
                this.albums = removeDuplicateAlbums(albumsData.items); 
        });
     });  
  }

  ngOnDestroy(): void {
      this.albumTemp.unsubscribe();
      this.artistTemp.unsubscribe();
      this.route.unsubscribe();
  }
}

function removeDuplicateAlbums(albums: Array<any>): Array<any> {
    let albumsTemp: Array<any> = [];
    albumsTemp = albums.filter((value, index, array) => 
                  index == array.findIndex((album) => 
                  (album.name.toUpperCase() == value.name.toUpperCase())));
    return albumsTemp;
}