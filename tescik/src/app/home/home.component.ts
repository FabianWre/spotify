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
      this.userName = user.display_name;
    },
    error: err => {
      console.error('Błąd pobierania użytkownika', err);
    }
  });
}

  loadPlaylists() {
    this.loading = true;

    this.auth.getUserPlaylists().subscribe({
      next: (res: any) => {
        this.playlists = res.items;
        this.loading = false;
      },
      error: err => {
        console.error('❌ Błąd:', err);
        this.loading = false;
      }
    });
  }
  userName: string | null = null;
  
}
