import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbModule } from './components/bread-crumb/bread-crumb.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BreadCrumbModule
  ],
  exports: [
    BreadCrumbModule
  ]
})
export class ShareModule { }
