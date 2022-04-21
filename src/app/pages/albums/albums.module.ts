import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './albums.component';


@NgModule({
  declarations: [
    AlbumsComponent
  ],
  imports: [
    CommonModule,
    AlbumsRoutingModule
  ],
  exports: [AlbumsRoutingModule]
})
export class AlbumsModule { }
