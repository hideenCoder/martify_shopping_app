import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'mg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {}

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.model)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err)
      })
  }
}
