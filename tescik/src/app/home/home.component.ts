import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpotifyAuthService } from '../spotify-auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  user: any = null;
  playlists: any[] = [];
  loading = false;

  constructor(
    private auth: SpotifyAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('spotify_access_token');

    if (!token) {
      this.router.navigate(['/']);
      return;
    }

    this.auth.getCurrentUser().subscribe({
      next: (user: any) => {
        this.user = user;
      },
      error: () => {
        this.logout();
      }
    });
  }

  loadPlaylists() {
    this.loading = true;

    this.auth.getUserPlaylists().subscribe({
      next: (res: any) => {
        this.playlists = res.items || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
