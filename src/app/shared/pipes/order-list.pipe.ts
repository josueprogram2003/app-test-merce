import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from 'src/app/core/models/categoria';

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {

  transform(items: Categoria[], orden: string): Categoria[] {
    if (!items || !orden) {
      return items;
    }
    return items.sort((a, b) => {
      const nombreA = a.nombre.toUpperCase();
      const nombreB = b.nombre.toUpperCase();

      if (orden === 'asc') {
        return nombreA.localeCompare(nombreB);
      } else if (orden === 'desc') {
        return nombreB.localeCompare(nombreA);
      } else {
        return 0; // Si el parámetro de orden no es válido, no se realiza ninguna ordenación.
      }
    });
  }

}
