import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  car: Car;
  brands: Brand[] = [];
  colors: Color[] = [];
  updateCarForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();

    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarById(params['carId']);
      }
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data[0];
      console.log(this.car);
    });
    this.createUpdateCarForm();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  createUpdateCarForm() {
    this.updateCarForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      modelYear: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  update() {
    if (this.updateCarForm.valid) {
      let car: Car = Object.assign({}, this.updateCarForm.value);
      car.carId = this.car.carId;
      car.brandId = Number(car.brandId);
      car.colorId = Number(car.colorId);

      console.log(this.updateCarForm.value);
      console.log(car);

      this.carService.update(car).subscribe(
        (response) => {
          return this.toastrService.success(
            response.message,
            'Araç Güncelleme başarılı bir şekilde gerçekleştirildi'
          );
        },
        (responseError) => {
          console.log(responseError.error.ValidationErrors);
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
      this.toastrService.warning('Form eksik bilgiler içeriyor.', 'Dikkat');
    }
  }
}
