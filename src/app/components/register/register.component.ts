import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private localStorageService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      lastName:["",Validators.required],
      firstName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      let registerModel:RegisterModel=Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        console.log(response);
        this.toastrService.info(response.message)
        this.localStorageService.setToken(response.data)
      },responseError=>{
        console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.warning("Formdaki verileri eksiksiz bir şekilde doldurunuz.")
    }
  }

}
// localStorage.setItem("token",response.data.token)