import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { listResponseModel } from 'src/app/models/listResponseModel';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetails[] = [];
  dataLoaded = false;

  imageBasePath = environment.baseUrl;
  defaultlogo = "/uploads/defaultlogo.jpg"

  currentCar: CarDetails;
  default: CarDetails;
  carImage:CarImage;
  carImages:CarImage[]=[];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService:CarImageService,

  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => { 
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } 
      else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } 
      else {
        this.getCars();
        this.getCarImages();
      }
    });
  }

  getCarImages() {

    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
      
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
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

  setCurrentAllCar() {
    this.currentCar = this.default;
  }

  getCurrentAllCarClass() {
    if (this.currentCar == this.default) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  getCarImageByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
      this.carImage= response.data[0];
    })

  }
}
// carResponseModel:CarResponseModel={
  //   data:this.cars,
  //   message:"",
  //   success:true
  // };