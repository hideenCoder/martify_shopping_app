import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { passwordMatch, mustContainSymbol } from './register.validators';
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'mg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.registerForm = this.builder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', { validators: [Validators.required, Validators.minLength(6), mustContainSymbol] }],
      confirmPassword: ''
    }, {
      validators: passwordMatch
    })
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(() => {
      this.router.navigate(['/login'])
    }, () => { })
  }
}