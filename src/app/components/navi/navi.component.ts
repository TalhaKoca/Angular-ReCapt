import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  checkAuth(){
    return this.authService.isAuthenticated();
  }

  getCurrentUser():User{
    return this.localStorageService.getCurrentUser()
  }

  logout(){
    this.localStorageService.removeToken();
    this.localStorageService.removeCurrentUser();
    this.toastrService.info("Oturum Sonlandırılıyor","Başarılı")
    return this.router.navigate(["/login"])
  }
}
