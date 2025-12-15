import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpotifyAuthService } from './spotify-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
})
export class App implements OnInit {
  isLogged:boolean = true;

  constructor(private auth: SpotifyAuthService) {}

  ngOnInit(): void{
    this.isLogged = this.getIsLogged();
  }



  login() {
    this.auth.login();
  
  }

private getIsLogged(): boolean {
  const token = localStorage.getItem('spotify_access_token');
  const expiresAt = localStorage.getItem('spotify_expires_at');
  if (!token || !expiresAt) {
    return false;
  }

  return Date.now() < Number(expiresAt);
}

}
