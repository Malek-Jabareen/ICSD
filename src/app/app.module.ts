import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DiagramComponent } from './diagram/diagram.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ExamplesComponent } from './examples/examples.component';

@NgModule({
  declarations: [AppComponent, DiagramComponent, FormComponent, ExamplesComponent],
  imports: [BrowserModule, FormsModule, ChartsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
