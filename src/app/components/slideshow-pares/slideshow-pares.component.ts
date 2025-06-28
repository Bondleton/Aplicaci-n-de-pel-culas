import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';

import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';


@Component({
  selector: 'app-slideshow-pares',
  standalone: false,
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  @ViewChild('swiperRef', { static: true }) swiperRef!: ElementRef;


  constructor(
    private modalCtrl: ModalController

  ) { }

  ngOnInit() { }

  onClick() {
    this.cargarMas.emit();

    setTimeout(() => {
      const swiper = (this.swiperRef.nativeElement as any).swiper;
      if (swiper) {
        swiper.slideTo(swiper.activeIndex - 8); // o slideTo(último índice deseado) si quieres saltar a cierta parte

      }
    }, 100);

  }

  async verDetalle(id: number) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

}
