import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { RoundComponent } from './round/round.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { WordComponent } from './word/word.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoaderComponent } from './loader/loader.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';



@NgModule({
  declarations: [
    AppComponent,
    RoundComponent,
    HomeComponent,
    WordComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
