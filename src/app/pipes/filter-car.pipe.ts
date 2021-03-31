import { Pipe, PipeTransform } from '@angular/core';
import { CarDetails } from '../models/carDetail';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value: CarDetails[], filterText:string): CarDetails[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (c: CarDetails) =>
            c.description.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }

}
