import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { PagesModule } from './pages/pages.module';
import { BreadCrumbModule } from './share/components/bread-crumb/bread-crumb.module';
import { ShareModule } from './share/share.module';
import { LoginComponent } from './layouts/login/login.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PagesModule,
    CommonModule,
    ShareModule,
    BreadCrumbModule,
    AppRoutingModule
  ],
  exports: [
    BrowserModule,
    CommonModule,
    HeaderComponent,
    PagesModule,
    ShareModule,
    BreadCrumbModule,
    AppRoutingModule,
    LoginComponent
  ]
})
export class CoreModule {   // 要保证 CoreModule 只能在 AppModule 中引入
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 只能被 AppModule 引入');
    }
  }
}
