import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './components/cities/cities.component';

const routes: Routes = [
  {path:'', redirectTo:'cities', pathMatch : 'full'},
  {path : 'cities', component:CitiesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
