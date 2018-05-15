import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import { validateAllFields } from '../../_tools/form.utils';
import { AlertifyService } from './../../_service/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  model: any = {};
  registerFormGroup: FormGroup;
  error: any = null;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private alertify: AlertifyService,
              private router: Router
            ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    };
    this.registerFormGroup = this.fb.group({
      gender: ['female'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.compose([Validators.required, this.passwordConfirm()])]
    });
  }

  register() {
    if (!validateAllFields(this.registerFormGroup)) {
      return;
    }
    this.model.username = this.registerFormGroup.get('username').value;
    this.model.password = this.registerFormGroup.get('password').value;
    this.authService.register(this.model).subscribe((res) => {
      this.error = null;
      this.alertify.success('Register User Successfully');
      this.router.navigate(['']);
    }, (error) => {
      this.error = error;
    });
  }

  passwordConfirm() {
    return (control): {[key: string]: any} => {
      if (!control.value) {
        return null;
      }
      const password = control._parent.get('password').value;
      if (control.value === password) {
        return null;
      }
      return { miamatched: true };
    };
  }
}
