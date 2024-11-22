import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { DropdownService } from '../services/dropdown.service';
import { EmployeeService } from '../services/employee.service';
import { ListOfEmployeeComponent } from './list-of-employee/list-of-employee.component';
import { HomeComponent } from './home/home.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    NavbarComponent,
    ListOfEmployeeComponent,
    HomeComponent,
    EditEmployeeComponent, 

  ],
  imports: [
    BrowserModule,
    HttpClientModule,   
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule

  ],
  providers: [
       DropdownService,
    EmployeeService
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
