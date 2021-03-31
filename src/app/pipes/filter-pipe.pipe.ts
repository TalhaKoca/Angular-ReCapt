import { Pipe, PipeTransform } from '@angular/core';
import { CarDetails } from '../models/carDetail';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: CarDetails[], filterText: string): CarDetails[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (c: CarDetails) =>
            c.brandName.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            c.colorName.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            c.description.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
// (`${ carDetail.brandName } ${ carDetail.description }`).toLocaleLowerCase()
// .indexOf(filterText) !== -1
