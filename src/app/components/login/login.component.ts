import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  currentUserEmail: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.setCurrentUserEmail();
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [this.currentUserEmail, [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel: LoginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.info(response.message);
          this.localStorageService.setToken(response.data);
          this.getUserByEmail(loginModel.email);
          this.loginForm.reset();
        },
        (responseError) => {
          console.log(responseError);
          this.toastrService.error(responseError.error);
        }
      );
    } else {
      this.toastrService.warning(
        'Formdaki verileri eksiksiz bir şekilde doldurunuz.'
      );
    }
  }

  getUserByEmail(email: string) {
    this.userService.getUserByEmail(email).subscribe((response) => {
      this.user = response.data;
      this.localStorageService.setCurrentUser(this.user);
    });
  }

  setCurrentUserEmail() {
    return this.localStorageService.getCurrentUser()
      ? (this.currentUserEmail = this.localStorageService.getCurrentUser().email)
      : null;
  }
}
// localStorage.setItem("token",response.data.token)
