import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-add',
  templateUrl: './rent-add.component.html',
  styleUrls: ['./rent-add.component.css'],
})
export class RentAddComponent implements OnInit {
  car: CarDetails;
  rental: Rental;
  rent: Rental;
  carId: number;
  customerId: number;
  addRentalForm: FormGroup;
  currentDate: Date = new Date();
  controlpoint: number = 0;

  constructor(
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.carId = parseInt(this.activatedRoute.snapshot.paramMap.get("carId"));
    this.createRentACarForm();
  }

  createRentACarForm() {
    this.addRentalForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      customerId: [0, Validators.required],
    });
  }

  rentFirstStage() {
    if (this.addRentalForm.invalid) {
      this.toastrService.warning('İlgili alanları eksiksiz doldurmalısınız...');
      return false;
    }
    this.rental = this.addRentalForm.value;
    this.carId = this.rental.carId;
    let rentDate = new Date(this.rental.rentDate);
    let returnDate = new Date(this.rental.returnDate);

    if (rentDate < this.currentDate) {
      this.toastrService.warning(
        'Kiralama tarihini bugünün tarihini dikkate alarak seçin...'
      );
      return false;
    }

    if (returnDate < rentDate || returnDate.getDate() == rentDate.getDate()) {
      this.toastrService.warning(
        'Teslim tarihi kiralama tarihinden sonraki günleri kapsamalıdır.'
      );
      return false;
    }
    this.toastrService.success('Araç kontrolü yapılıyor..');
    this.checkDelivered();
    return true;
  }

  checkDelivered() {
    this.rentalService.getRentalByCarId(this.carId).subscribe((response) => {
      this.rent = response.data[0];
      console.log(this.rent);
      if (this.rent.returnDate == null) {
        this.toastrService.error('Araç teslimi henüz gerçekleşmedi');
        return false;
      } else {
        this.controlpoint += 1;
        return this.add();
      }
    });
    
  }

  add() {
    if (this.controlpoint) {
      let rentModel = Object.assign({}, this.addRentalForm.value);
      console.log(rentModel)
      console.log(this.addRentalForm.value)
      this.rentalService.add(rentModel).subscribe(
        (response) => {
          this.controlpoint -= 1;
          console.log(this.controlpoint)
          this.toastrService.info(
            response.message,
            'İşlem başarılı bir şekilde gerçekleştirildi. Ödeme Sayfasına yönlendiriliyorsunuz.Lütfen bekleyiniz... '
          );
          return this.router.navigate(['/cars']);
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
    } else {
      this.toastrService.error(
        'Sistemde yaşanılan aksaklıktan dolayı özür dileriz.'
      );
    }
  }
}
