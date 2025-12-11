import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyAuthService } from '../spotify-auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: `<p>Udało się zalogować</p>`
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private auth: SpotifyAuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.auth.getAccessToken(code).subscribe
          
        
      }
    });
  }
}
