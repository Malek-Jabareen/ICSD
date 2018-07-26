import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { DiagramComponent } from './diagram/diagram.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import {environment} from '../environments/environment';
import { AngularFireDatabase } from 'angularfire2/database';

@NgModule({
  declarations: [AppComponent, DiagramComponent, FormComponent],
  imports: [BrowserModule, FormsModule, AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
