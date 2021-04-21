import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrEditComponent } from './components/create-or-edit/create-or-edit.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'CreateOrEdit', component: CreateOrEditComponent},
  {path: 'CreateOrEdit/:id', component: CreateOrEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
