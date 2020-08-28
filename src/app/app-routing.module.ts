import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RoundComponent} from './round/round.component';
import {LoaderComponent} from './loader/loader.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'round/:id', component: RoundComponent},
  {path: 'loader', component: LoaderComponent},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
