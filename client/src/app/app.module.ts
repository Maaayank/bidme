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
import { FeedsComponent } from './components/feeds/feeds.component';
import { FeedsService } from './services/feeds.service';
import { BaseformComponent } from './components/home/baseform/baseform.component';
import { ExpandedFormComponent } from './components/home/expandedform/expandedform.component';
import { ProductsComponent } from './components/home/products/products.component';

// firebase libs
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth'

//environments
import { environment } from '../environments/environment';
import { ErrorpageComponent } from './components/errorpage/errorpage.component'

//date and time picker
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ProductitemComponent } from './components/home/products/productitem/productitem.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    FeedsComponent,
    BaseformComponent,
    ExpandedFormComponent,
    ProductsComponent,
    ErrorpageComponent,
    ProductitemComponent,
    ProductInfoComponent
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
    AngularFireAuthModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [UserService, FeedsService],
  bootstrap: [AppComponent]
})
export class AppModule { }