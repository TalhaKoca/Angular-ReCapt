import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/carimage/:carId",component:CarComponent},
  {path:"cars/cardetail/:carId",component:CarDetailsComponent},
  //{path:"cars/color/:colorId",component:CarDetailsComponent},
  //{path:"cars/brand/:brandId",component:CarDetailsComponent},
  //{path:"cars",component:CarDetailsComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
