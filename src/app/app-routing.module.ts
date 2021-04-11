import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { RentAddComponent } from './components/car/rent-add/rent-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/carimage/:carId', component: CarComponent },
  { path: 'cars/cardetail/:carId', component: CarDetailsComponent },

  {
    path: 'cars/brand/:selectedBrandId/color/:selectedColorId',
    component: CarComponent,
  },
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  { path: 'rentals', component: RentalDetailComponent },
  { path: 'cardetails/rentals/add', component: RentAddComponent },
  { path: 'cardetails/payments', component: PaymentComponent },
  { path: 'cars/addCar', component: CarAddComponent, canActivate:[LoginGuard]},
  { path: 'cars/updatecar/:carId', component: CarUpdateComponent },
  { path: 'brands/addbrand', component: BrandAddComponent },
  { path: 'brands/updatebrand/:brandId', component: BrandUpdateComponent },
  { path: 'colors/updatecolor/:colorId', component: ColorUpdateComponent },
  { path: 'colors/addcolor', component: ColorAddComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
