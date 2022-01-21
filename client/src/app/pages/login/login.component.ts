import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.router.navigate(['/list_of_categories']).then(() => {
          window.location.reload();
        });
      }

    });
  }

  openRegisterPage() {
    this.router.navigate(['/register']);
  }

}
