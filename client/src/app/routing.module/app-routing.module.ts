import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoginComponent} from '../components/login/login.component';
import{RegisterComponent} from '../components/register/register.component';
import{HomepageComponent} from '../components/homepage/homepage.component';


const routes: Routes = [
  {path:'',redirectTo:'homepage',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'homepage',component:HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
