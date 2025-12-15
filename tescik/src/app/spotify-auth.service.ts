import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {

  private clientId = '2b02fb02a65c4245ab01b4f55578cfa9';
  private clientSecret = '50beb5956e0d425c9c252e0981901b91';
  private redirectUri = 'http://127.0.0.1:4200/callback';

  constructor(private http: HttpClient) {}

 login() {
  const scopes = [
    'playlist-read-private',
    'playlist-read-collaborative'
  ].join(' ');

  const url =
    'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + this.clientId +
    '&scope=' + encodeURIComponent(scopes) +
    '&redirect_uri=' + encodeURIComponent(this.redirectUri);

  window.location.href = url;
}

  getAccessToken(code: string) {
    const url = 'https://accounts.spotify.com/api/token';

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(url, body.toString(), { headers });
  }

  getUserPlaylists() {
  const token = localStorage.getItem('spotify_access_token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get(
    'https://api.spotify.com/v1/me/playlists',
    { headers }
  );
}
getCurrentUser() {
  const token = localStorage.getItem('spotify_access_token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get('https://api.spotify.com/v1/me', { headers });
}
}
