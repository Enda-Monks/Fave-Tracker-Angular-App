import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
  
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        const newReleaseUrl: string = `https://api.spotify.com/v1/browse/new-releases`;
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(newReleaseUrl, {
          headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id: string): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap((token) => {
        return this.http.get<SpotifyApi.SingleArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${token}` } });
        }));
  }

  getAlbumsByArtistId(id: string): Observable<SpotifyApi.ArtistsAlbumsResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap((token) => {
          return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, {
            headers: { Authorization: `Bearer ${token}` } });
        }));
  }


  getAlbumById(id: string): Observable<SpotifyApi.SingleAlbumResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap((token) => {
          return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, {
            headers: { Authorization: `Bearer ${token}` } });
        }));
  }

  searchArtists(searchString: string): Observable<SpotifyApi.ArtistSearchResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap((token) => {
          return this.http.get<SpotifyApi.ArtistSearchResponse>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, {
            headers: { Authorization: `Bearer ${token}` } });
        }));
  }

addToFavourites(id:string): Observable<[String]> {
    return this.http.put<any>(`${environment.userAPIBase}/favourites/${id}`, id );
}

removeFromFavourites(id:string): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
        if (favouritesArray.indexOf(id) != -1) {
            let removed = favouritesArray.splice(favouritesArray.indexOf(id), 1);
            console.log(removed + ' id has been removed');
        }
        return this.getFavourites();
    }));
}


getFavourites(): Observable<any> {
  return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
      if(favouritesArray.length > 0){
          let ids: string = [...favouritesArray].join(',');
          return this.spotifyToken.getBearerToken().pipe( mergeMap((token) => {
              return this.http.get<any>( `https://api.spotify.com/v1/tracks?ids=${ids}`,
              { headers: { Authorization: `Bearer ${token}` } });
          }));
      }else{
          return new Observable(o=>o.next({tracks: []}));
      }
  }));}
}
