import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private clientId = '2b02fb02a65c4245ab01b4f55578cfa9';
  private redirectUri = 'http://127.0.0.1:4200/callback';

  constructor(private http: HttpClient) {}

  login() {
    const scope = 'user-read-private user-read-email';
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.search = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope
    }).toString();

    window.location.href = authUrl.toString();
  }

  // HttpClient 
  async getAccessToken(code: string) {
    const url = 'https://accounts.spotify.com/api/token';

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('client_secret', '50beb5956e0d425c9c252e0981901b91');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post(url, body.toString(), { headers }).subscribe({
    next: (response: any) => {

      const accessToken = response.access_token;
      const refreshToken = response.refresh_token;
      const expiresIn = response.expires_in;

      console.log('Access token:', accessToken);
      console.log('Refresh token:', refreshToken);
      console.log('Wygasa (sekundy):', expiresIn);

      const expiresAt = Date.now() + expiresIn * 1000;
      console.log('Token wygasa:', new Date(expiresAt).toLocaleString());

      localStorage.setItem('spotify_access_token', accessToken);
      localStorage.setItem('spotify_expires_at', expiresAt.toString());

      if (refreshToken) {
        localStorage.setItem('spotify_refresh_token', refreshToken);
      }
    },
    error: (error) => {
      console.error('❌ Błąd podczas pobierania tokena:', error);
    }
  });
  }
}
