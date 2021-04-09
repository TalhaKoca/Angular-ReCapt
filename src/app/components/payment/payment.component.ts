import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rentedCar:Rental;
  customerId : number;
  payment:Payment;
  addPaymentForm:FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private paymentService : PaymentService,
    private rentalService : RentalService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.checkNullRentingCar();
    this.createPaymentAddForm();
  }

  createPaymentAddForm(){
    this.customerId = this.rentalService.getRentedCar().customerId;
    this.addPaymentForm = this.formBuilder.group({

      customerId:[this.customerId,Validators.required],
      cardHolder:["",Validators.required],
      cardNumber:["",Validators.required],
      expiryDate:["",Validators.required],
      securityNumber:["",Validators.required]
    })
  }

  add(){
    this.rentedCar = Object.assign({},this.rentalService.getRentedCar());
    console.log(this.rentedCar)
    if (this.addPaymentForm.invalid){
      return this.toastrService.warning("Formdaki eksik olan verileri doldurunuz...")
    }
    this.payment = Object.assign({},this.addPaymentForm.value);
    console.log(this.payment)
    this.addPayment(this.payment)
    return this.addRental(this.rentedCar);
    
  }

  addRental(rental:Rental){
      this.rentalService.addDefault(rental).subscribe(
        (response) => {
          this.toastrService.info(
            response.message,
            'İşlem başarılı bir şekilde gerçekleştirildi. Ana Sayfaya yönlendiriliyorsunuz.Lütfen bekleyiniz... '
          );
          return true;
          //return this.router.navigate(["/cars"])
        },
        (responseError) => {
          console.log(responseError.error.ValidationErrors)
          if (responseError.error.ValidationErrors.length > 0)
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
        }
      );
  }
  addPayment(payment:Payment){   
    this.paymentService.add(payment).subscribe(response=>{
      this.toastrService.info(
        response.message,
        'Ödeme bilgileriniz alınıyor.Lütfen bekleyiniz... '
      );
    },
    (responseError) => {
      console.log(responseError.error.ValidationErrors)
      if (responseError.error.ValidationErrors.length > 0)
        for (
          let i = 0;
          i < responseError.error.ValidationErrors.length;
          i++
        ) {
          this.toastrService.error(
            responseError.error.ValidationErrors[i].ErrorMessage,
            'Doğrulama Hatası'
          );
        }
    }
  );
  }

  checkNullRentingCar(){
    if (!this.rentalService.getRentedCar()){
    this.toastrService.warning("Kiralama formunu eksiksiz doldurun.")
    return this.router.navigate(["/cardetails"]);
  }
  return true;

  }
  
}
