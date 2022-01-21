import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(email: string, password: string) {
    this.authService.signup(email, password).subscribe((response: HttpResponse<any>) => {});
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  openLoginPage() {
    this.router.navigate(['/login']);
  }

}
