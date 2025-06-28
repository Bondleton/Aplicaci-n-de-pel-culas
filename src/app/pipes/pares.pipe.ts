import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pares',
  standalone: false
})
export class ParesPipe implements PipeTransform {

  // transform(arr: any[]): any[] {
  //   const pares = [];
  //   for (let i = 0; i < arr.length; i += 2) {
  //     pares.push(arr.slice(i, i + 2));
  //   }
  //   return pares;
  // }

  transform(arr: any[]): any[] {
  const pares = arr.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []);

  return pares;
}




}
