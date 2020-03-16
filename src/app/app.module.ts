import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';
import { RestangularModule } from 'ngx-restangular';
import { fakeData } from './sampleRestApi';

export function RestangularConfigFactory(RestangularProvider: any) {
  RestangularProvider.setBaseUrl(fakeData());
  RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer q!JLohbH4!sR4beDetlBsyL_p5n0hdKo'});
}



@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
