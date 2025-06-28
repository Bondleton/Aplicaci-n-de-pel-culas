import { Component, Input, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { Genre, Pelicula, PeliculaDetalle } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  // peliculas: PeliculaDetalle[] = [];
  peliculas: Pelicula[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];

  constructor(
    private dataLocal: DataLocalService,
    private moviesService: MoviesService,
  ) { }

  // async ngOnInit() {
  //   this.peliculas = await this.dataLocal.cargarFavoritos();
  //   this.moviesService.cargarGeneros();
  // }

  async ionViewWillEnter() {
    const favoritas: PeliculaDetalle[] = await this.dataLocal.cargarFavoritos();

    this.peliculas = favoritas.map(p => ({
      adult: p.adult ?? false,
      backdrop_path: p.backdrop_path ?? '',
      genre_ids: p.genre_ids ?? [],
      id: p.id!,
      original_language: p.original_language ?? '',
      original_title: p.original_title ?? '',
      overview: p.overview ?? '',
      popularity: p.popularity ?? 0,
      poster_path: p.poster_path ?? '',
      release_date: p.release_date ?? '',
      title: p.title ?? '',
      video: p.video ?? false,
      vote_average: p.vote_average ?? 0,
      vote_count: p.vote_count ?? 0
    }));

    this.generos = await this.moviesService.cargarGeneros();

    // this.pelisPorGenero(this.generos, this.peliculas);
    this.pelisPorGenero(this.generos, favoritas);

  }



  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritoGenero = [];
    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres?.find(genre => genre.id === genero.id);
        })
      });
    });
    console.log(this.favoritoGenero);

  }

}
