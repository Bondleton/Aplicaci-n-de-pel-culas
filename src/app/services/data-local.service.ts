import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  // Guardar en el storage
  private _storage: Storage | null = null; // localstorage reciente
  peliculas: PeliculaDetalle[] = [];

  constructor(
    private storage: Storage,
    private toasCtrl: ToastController
  ) {
    this.init();
    this.cargarFavoritos();
  }

  // Toast
  async presentToast(message: string) {
    const toast = await this.toasCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async guardarPelicula(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Eliminado de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregado a favoritos';
    }

    await this.presentToast(mensaje);
    await this._storage?.set('peliculas', this.peliculas);

    return !existe;
  }


  // Usamos await this.storage.create() para obtener una instancia de almacenamiento funcional.
  // Luego, this._storage se usa en los métodos del servicio.

  // guardarPelicula(pelicula: PeliculaDetalle) {
  //   this.peliculas.push(pelicula);
  //   this.storage.set('peliculas', this.peliculas);
  // }

  async cargarFavoritos(){
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id: number){
    await this.cargarFavoritos();
    const existe = this.peliculas.find(
      peli => peli.id === id
    );
    return (existe) ? true : false;
  }



}
