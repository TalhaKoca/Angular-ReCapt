import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetails } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetails[] = [];
  carImages: CarImage[] = [];
  carImage: CarImage;

  brands: Brand[] = [];
  colors: Color[] = [];
  currentCar: CarDetails;

  dataLoaded = false;

  imageBasePath = environment.baseUrl;
  defaultlogo = '/uploads/defaultlogo.jpg';

  brandFilter: number;
  colorFilter: number;

  filterText: '';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['selectedBrandId'] && params['selectedColorId']) {
        this.getCarByBrandAndColorId(
          params['selectedBrandId'],
          params['selectedColorId']
        );
      } else {
        this.getCars();
        this.getCarImages();
      }
    });
  }

  getCarImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
      console.log(this.carImages);
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarImageByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImage = response.data[0];
    });
  }

  getCarByBrandAndColorId(brandId: number, colorId: number) {
    this.carService
      .getCarDetailsByBrandAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        console.log(this.cars);
      });
  }

  getSelectedColor(colorId: number) {
    if (this.colorFilter == colorId) {
      return true;
    } else {
      return false;
    }
  }

  getSelectedBrand(brandId: number) {
    if (this.brandFilter == brandId) {
      return true;
    } else {
      return false;
    }
  }

  setCurrentCar(car: CarDetails) {
    this.currentCar = car;
  }

  getCurrentCarClass(car: CarDetails) {
    if (this.currentCar == car) {
      return 'table-info cursorPointer';
    } else {
      return 'cursorPointer';
    }
  }
}
// carResponseModel:CarResponseModel={
//   data:this.cars,
//   message:"",
//   success:true
// };
