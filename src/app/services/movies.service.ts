import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre, PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { RespuestaGenero } from '../interfaces/interfaces';
const URL = environment.url;
const apiKey = environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularesPages = 0;
  generos: Genre[] = [];


  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

    return this.http.get<T>(query);
  }

  getPopulares() {
    this.popularesPages++;

    // const query = `/discover/movie?sort_by=popularity.desc&${this.popularesPages}`;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPages}`;

    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  // buscarPeliculas(texto: string) {
  //   return this.ejecutarQuery(`/search/movie?query=${texto}`);
  // }

  buscarPeliculas(texto: string) {
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${texto}`);
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    const mesString = mes < 10 ? '0' + mes : mes.toString();

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPeliculaDetalle(id: number) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1d`);
  }

  getActoresPelicula(id: number) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1d`);
  }

  // getGeneros() {
  //   return this.ejecutarQuery<PeliculaDetalle>('/genre/movie/list?a=1');
  // }

  // cargarGeneros(){
  //   return new Promise (resolve =>{
  //     this.ejecutarQuery(`/genre/movie/list?a1`)
  //       .subscribe(resp => {
  //         this.generos = resp['genres'];
  //         console.log(this.generos);
  //         resolve(this.generos);
  //       });
  //   });
  // }

  cargarGeneros(): Promise<Genre[]> {
    return new Promise(resolve => {
      this.ejecutarQuery<RespuestaGenero>(`/genre/movie/list?a=1`)
        .subscribe(resp => {
          this.generos = resp.genres;
          console.log(this.generos);
          resolve(this.generos);
        });
    });
  }

}
