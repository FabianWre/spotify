import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyAuthService } from '../spotify-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  constructor(private auth: SpotifyAuthService) {}

  login() {
    this.auth.login();
  }
}