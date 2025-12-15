
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyAuthService } from '../spotify-auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: `<p>Ładowanie...</p>`
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private auth: SpotifyAuthService,
     private router: Router
  ) {}

ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];

      if (code) {
        this.auth.getAccessToken(code).subscribe({
          next: (response: any) => {
            const accessToken = response.access_token;
            const refreshToken = response.refresh_token;
            const expiresIn = response.expires_in;

            console.log('Access token:', accessToken);
            console.log('Refresh token:', refreshToken);
            console.log('Wygasa (sekundy):', expiresIn);

            const expiresAt = Date.now() + expiresIn * 1000;
            console.log('Token wygaśnie:', new Date(expiresAt).toLocaleString());

            localStorage.setItem('spotify_access_token', accessToken);
            localStorage.setItem('spotify_expires_at', expiresAt.toString());

            if (refreshToken) {
              localStorage.setItem('spotify_refresh_token', refreshToken);
            }
            this.router.navigate(['/home']);
          },
          error: err => {
            console.error("Błąd przy pobieraniu tokena:", err);
          }
        });
      }
    });
  }
}