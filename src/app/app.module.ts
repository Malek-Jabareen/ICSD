import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DiagramComponent } from './diagram/diagram.component';
import { FormComponent } from './form/form.component';
import { HeadersComponent } from './headers/headers.component';


@NgModule({
  declarations: [AppComponent, DiagramComponent, FormComponent, HeadersComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
