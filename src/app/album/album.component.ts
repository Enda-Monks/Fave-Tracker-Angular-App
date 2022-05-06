import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy{
 
  route: any;
  album: any;
  albumTemp: any;
  
  constructor( private snackBarService: MatSnackBar, private activatedRoute: ActivatedRoute, private musicService: MusicDataService) { }

  ngOnInit(): void {
      this.route = this.activatedRoute.params.subscribe(params => {
          this.albumTemp = this.musicService.getAlbumById(params['id']).subscribe(albumData => {
              this.album = albumData;
        });
      })
  }
  
  ngOnDestroy(): void {
      this.route.unsubscribe();
      this.albumTemp.unsubscribe();
  }

  addToFavourites(trackID: string): void {   
    this.musicService.addToFavourites(trackID).subscribe({
        next: success=>{
            this.snackBarService.open('Adding to Favourites...', 'Done',  { duration: 1500, });
        },
        error: err=>{
            this.snackBarService.open('Unable to add song to Favourites');
        }
      });
  }
}