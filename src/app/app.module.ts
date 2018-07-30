import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DiagramComponent } from './diagram/diagram.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, DiagramComponent, FormComponent],
  imports: [BrowserModule,FormsModule, ChartsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
