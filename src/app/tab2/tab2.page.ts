import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'El viaje de Chihiro', 'Batman', 'Bob Esponja'];
  peliculas: Pelicula[] = [];

  // spinner
  buscando = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) { }

  buscar(event: CustomEvent) {
    const valor: string = event.detail.value;

    if(valor.length === 0){
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    // if (valor.trim().length === 0) { // elimina espacios en blanco al inicio y final del texto
    //   this.buscando = false;
    //   this.peliculas = [];
    //   return;
    // }


    this.buscando = true;

    this.moviesService.buscarPeliculas(valor)
      .subscribe(resp => {
        console.log(resp);
        this.peliculas = resp.results;
        this.buscando = false;

      });
  }

  seleccionarIdea(idea: string) {
    this.textoBuscar = idea;
    // this.buscando = true;

    this.moviesService.buscarPeliculas(idea)
      .subscribe(resp => {
        console.log('Resultado de idea seleccionada:', resp);
        this.peliculas = resp.results;
        // this.buscando = false;
      });
  }

  // Abir modal
  async detalle( id: number){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });

    modal.present();
  }



  // buscar(event: CustomEvent) {
  //   const valor = event.detail.value;
  //   // console.log(valor); // Impruime lo que se esta buscando

  //   this.moviesService.buscarPeliculas(valor)
  //     .subscribe(resp => {
  //       console.log(resp);
  //       // this.peliculas = resp['results'];
  //     });

  // }

  // // Nuevo, para que se realice la busqueda por idea

  // seleccionarIdea(idea: string) {
  //   this.textoBuscar = idea;

  //   // Aquí llamas directamente a buscarPeliculas
  //   this.moviesService.buscarPeliculas(idea)
  //     .subscribe(resp => {
  //       console.log('Resultado de idea seleccionada:', resp);
  //     });
  // }



}
