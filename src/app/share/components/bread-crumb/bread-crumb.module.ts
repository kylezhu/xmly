import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './bread-crumb.component';
import { BreadCrumbItemComponent } from './bread-crumb-item/bread-crumb-item.component';



@NgModule({
  declarations: [
    BreadCrumbComponent,
    BreadCrumbItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BreadCrumbComponent,
    BreadCrumbItemComponent
  ]
})
export class BreadCrumbModule { }
