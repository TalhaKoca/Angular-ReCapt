import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentItem } from 'src/app/models/rentItem';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:Rental[]=[];
  rentalDetails:RentalDetail[]=[]
  rentItems : RentItem[];
  dataLoaded=false;
  
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentDetails();
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals= response.data;
      this.dataLoaded=true;
    })
  }

  getRentDetails(){
    this.rentalService.getRentalDetails().subscribe(response=>{
      this.rentalDetails = response.data;
      this.dataLoaded=true;
    })
  }

}
