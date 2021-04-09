import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ColorComponent } from './components/color/color.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterCarPipe } from './pipes/filter-car.pipe';

import { ToastrModule } from 'ngx-toastr';
import { CarFilterComponent } from './components/car/car-filter/car-filter.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { RentAddComponent } from './components/car/rent-add/rent-add.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    NaviComponent,
    CustomerComponent,
    ColorComponent,
    RentalComponent,
    CarDetailsComponent,
    VatAddedPipe,
    FilterPipePipe,
    FilterColorPipe,
    FilterCarPipe,
    CarFilterComponent,
    RentalDetailComponent,
    RentAddComponent,
    CarAddComponent,
    PaymentComponent,
    CarUpdateComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
