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
    const scopes = 'user-read-email user-read-private';

    const authUrl =
      'https://accounts.spotify.com/authorize?' +
      'client_id=' + this.clientId +
      '&response_type=code' +
      '&redirect_uri=' + encodeURIComponent(this.redirectUri) +
      '&scope=' + encodeURIComponent(scopes);

    window.location.href = authUrl;
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
}
