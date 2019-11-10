import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http : HttpClient) {
    console.log('Spotify Service Listo');
   }

   getQuery(query: string){
     
    const url= `https://api.spotify.com/v1/${query}`;

    const headers =  new HttpHeaders({
      'Authorization': 'Bearer BQCzxOyFwwtE_v3C6VER80xsFg8-2ubkAFFTEbNMFa_TPs57BpYgYcDplb8p3OYO8L63UaHlKX0ToRl9meU'
    });

    return this.http.get(url, { headers});

   }

   getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map( data =>data['albums'].items ));
   }

   getArtists(valor:string){
    return this.getQuery(`search?query=${valor}&type=artist&offset=0&limit=15`)
                .pipe( map( data => data['artists'].items));
   }

   getArtist(id:string){
    return this.getQuery(`artists/${id}`);
                // .pipe( map( data => data['artists'].items));
   }

   getTopTracks(id:string){
    return this.getQuery(`artists/${id}/top-tracks?country=US`)
                .pipe( map( data => data['tracks']));
   }
}
