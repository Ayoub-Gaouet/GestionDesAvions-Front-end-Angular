import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAvionComponent } from './add-avion/add-avion.component';
import { AvionGuard } from './avion.guard';
import { AvionsComponent } from './avions/avions.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { RechercheParCompanyComponent } from './recherche-par-company/recherche-par-company.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { UpdateAvionComponent } from './update-avion/update-avion.component';

const routes: Routes = [
  {path: "avions", component : AvionsComponent},
  {path: "add-avions", component : AddAvionComponent, canActivate:[AvionGuard]},
  {path: "", redirectTo: "avions", pathMatch: "full"},  
  {path: "updateAvion/:id", component: UpdateAvionComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "rechercheParCompany", component : RechercheParCompanyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
