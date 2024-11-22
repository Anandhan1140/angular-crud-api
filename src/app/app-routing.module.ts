import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ListOfEmployeeComponent } from './list-of-employee/list-of-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

const routes: Routes = [
  {path: '', component: NavbarComponent},
  {path: 'home' ,component:HomeComponent},
  {path: 'create', component: CreateComponent},
  {path: 'list-of-employee',component:ListOfEmployeeComponent },
  {path:'edit-employee/:id',component:EditEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
