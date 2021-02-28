import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing.module/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { HomepageComponent } from './components/home/homepage/homepage.component';

import { SocialLoginModule } from 'angularx-social-login';
import { AgmCoreModule } from '@agm/core';
import { FeedsComponent } from './components/feeds/feeds.component';
import { FeedsService } from './services/feeds.service';
import { BaseformComponent } from './components/home/baseform/baseform.component';
import { ExpandedFormComponent } from './components/home/expandedform/expandedform.component';
import { ProductsComponent } from './components/home/products/products.component';

// firebase libs
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

//environments
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    FeedsComponent,
    BaseformComponent,
    ExpandedFormComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    ToastrModule.forRoot({ "positionClass": "toast-bottom-right" }),
    BrowserAnimationsModule,
    SocialLoginModule,
    AutocompleteLibModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAR2KkBPJU3mIcElCXDENPXTSk9Rt2WHZM',
      libraries: ['places']
    })
  ],
  providers: [UserService, FeedsService],
  bootstrap: [AppComponent]
})
export class AppModule { }