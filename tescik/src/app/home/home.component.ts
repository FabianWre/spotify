import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpotifyAuthService } from '../spotify-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private auth: SpotifyAuthService) {}

  login() {
    this.auth.login();
  }
}