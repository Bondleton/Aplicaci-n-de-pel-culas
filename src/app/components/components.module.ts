import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesshowBackdropComponent } from './slidesshow-backdrop/slidesshow-backdrop.component';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    SlidesshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetalleComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
  ],
  exports: [
    SlidesshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetalleComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
