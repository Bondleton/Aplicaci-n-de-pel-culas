import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  standalone: false,
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  // @Input() id;
  @Input() id!: number;
  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[] = [];

  // Icono de favoritos (en realidad uso corazon)
  estrella = 'heart-outline'; // corazon relleno, corazon tachado heart-dislike

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
  ) { }

  ngOnInit(): void {

    this.dataLocal.existePelicula(this.id)
      .then(existe => this.estrella = (existe) ? 'heart' : 'heart-outline');

    // console.log('Detalle component existe', existe);

    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe(resp => {
        console.log(resp);
        this.pelicula = resp;
        // console.log('Géneros (ids):', this.pelicula.genre_ids);
      });

    this.moviesService.getActoresPelicula(this.id)
      .subscribe(resp => {
        console.log(resp);
        this.actores = resp.cast;
      });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    //aqui lo declara como const
    this.dataLocal.guardarPelicula(this.pelicula)
      .then(existe => this.estrella = (existe) ? 'heart' : 'heart-outline');

  }



}
