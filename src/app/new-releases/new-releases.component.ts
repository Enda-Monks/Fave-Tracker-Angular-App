import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})

export class NewReleasesComponent implements OnInit, OnDestroy {

    releases: Array<any> = [];  
    newReleases:  any;

    constructor(private dataService: MusicDataService) { }

    ngOnInit() : void {
        this.newReleases = this.dataService.getNewReleases().subscribe(data=> this.releases = data.albums.items);
    }

    ngOnDestroy(): void {
        this.newReleases.unsubscribe();
    }
}
