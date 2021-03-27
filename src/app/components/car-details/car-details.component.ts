import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  
  carDetails: CarDetails[] = [];
  cardetails : CarDetails;
  
  carImages:CarImage[]=[];
  currentImage:CarImage;
  
  dataLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carImageService:CarImageService,
    private carService : CarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
        this.getCarImagesByCarId(params['carId']);
      }
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.cardetails = response.data[0];
      this.dataLoaded = true;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }

  getSliderClassName(carImage:CarImage){
    if(this.currentImage ==carImage){
      return "carousel-item active"
    }else{
      return "carousel-item"
    }
}
}