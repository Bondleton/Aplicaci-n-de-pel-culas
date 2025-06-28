import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imPath;

@Pipe({
  name: 'imagen',
  standalone: false,
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

    if (!img) {
      // return img;
    }

    const imgUrl = `${URL}/${size}${img} `;

    // console.log('URL', imgUrl);

    return imgUrl;
  }

}
