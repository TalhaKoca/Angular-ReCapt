import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  car: Car;
  addCarForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.addCarForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      description: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(
      (response) => {
        this.brands = response.data;
      },
      (responseError) => {
        this.toastrService.error(responseError.message, responseError.name);
      }
    );
  }

  getColors() {
    this.colorService.getColors().subscribe(
      (response) => {
        this.colors = response.data;
      },
      (responseError) => {
        this.toastrService.error(responseError.message, responseError.name);
      }
    );
  }

  addCar() {
    if (this.addCarForm.valid) {
      this.car = Object.assign({}, this.addCarForm.value);

      this.car.brandId = Number(this.car.brandId);
      this.car.colorId = Number(this.car.colorId);

      this.carService.add(this.car).subscribe(
        (response) => {
          this.addCarForm.reset();
          this.toastrService.success(response.message, 'Araç Eklendi.');
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
