import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoginComponent} from '../components/login/login.component';
import{RegisterComponent} from '../components/register/register.component';
import{HomepageComponent} from '../components/home/homepage/homepage.component';
import { ErrorpageComponent } from '../components/errorpage/errorpage.component';
import { ProductInfoComponent } from '../components/productinfo/productinfo.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomepageComponent},
  {path:'product/:pid',component:ProductInfoComponent},
  {path: '**', component:ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
