import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { RentAddComponent } from './components/car/rent-add/rent-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';

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
  { path: 'cars/addCar', component: CarAddComponent },
  { path: 'cars/updatecar/:carId', component: CarUpdateComponent },
  { path: 'brands/addbrand', component: BrandAddComponent },
  { path: 'brands/updatebrand/:brandId', component: BrandUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
