import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged: boolean;
  userId: any;

  constructor(private authService: AuthService, private router: Router) {
    this.isLogged = false;
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {
    this.checkUser();
  }
  
  checkUser() {
    this.userId != null ? this.isLogged = true : this.isLogged = false;
  }

  exit() {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
