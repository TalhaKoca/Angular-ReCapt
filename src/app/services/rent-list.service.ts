import { Injectable } from '@angular/core';
import { CarDetails } from '../models/carDetail';
import { RentItem } from '../models/rentItem';
import { RentItems } from '../models/rentItems';

@Injectable({
  providedIn: 'root'
})
export class RentListService {

  constructor() { }

  addToList(car:CarDetails){
    let item = RentItems.find(r=>r.carId.brandName===car.brandName);
    if (item){
      item.price += car.dailyPrice;

    }else{
      let rentItem = new RentItem();
      rentItem.carId = car;
      rentItem.price = car.dailyPrice;
      RentItems.push(rentItem)
    }
  }

  list():RentItem[]{
    return RentItems;
  }

  removeFromList(car:CarDetails){
    let item = RentItems.find(r=>r.carId.brandName===car.brandName);
    RentItems.splice(RentItems.indexOf(item),1);
  }
}
