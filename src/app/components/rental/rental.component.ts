import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { RentItem } from 'src/app/models/rentItem';
import { RentListService } from 'src/app/services/rent-list.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  rentItems: RentItem[]=[];
  dataLoaded = false;

  constructor(
    private rentListService: RentListService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.rentItems = this.rentListService.list();
  }

  removeFromList(car:CarDetails){
    this.rentListService.removeFromList(car);
    this.toastrService.error("Silindi",car.brandName+"listeden silindi")
  }
}
