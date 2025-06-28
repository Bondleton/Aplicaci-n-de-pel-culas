import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.moviesService.getFeature()
      .subscribe(resp => {
        // console.log('Resp', resp);
        this.peliculasRecientes = resp.results;
      });

    this.getPopulares();

  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares()
      .subscribe(resp => {
        const arrTemp = [...this.populares, ...resp.results];
        // const arrTemp = [...resp.results, ...this.populares ];
        this.populares = arrTemp;
      });
  }

}
