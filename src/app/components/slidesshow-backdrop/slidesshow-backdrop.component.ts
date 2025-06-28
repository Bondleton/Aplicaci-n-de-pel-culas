import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slidesshow-backdrop',
  standalone: false,
  templateUrl: './slidesshow-backdrop.component.html',
  styleUrls: ['./slidesshow-backdrop.component.scss'],
})
export class SlidesshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  constructor(
    private modalCtrl: ModalController

  ) { }

  ngOnInit() { }

  async verDetalle( id: number ){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });

    modal.present();

  }

}
