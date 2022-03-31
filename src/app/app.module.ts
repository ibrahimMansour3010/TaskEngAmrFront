import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { BranchComponent } from './Components/branch/branch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBranchComponent } from './Components/add-branch/add-branch.component';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './Services/auth.service';
import { AutInterceptorService } from './Services/aut-interceptor.service';
import { EditBranchComponent } from './Components/edit-branch/edit-branch.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BranchComponent,
    AddBranchComponent,
    EditBranchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    
  ],
  providers: [
    AutInterceptorService,{
      provide:HTTP_INTERCEPTORS,
      useClass:AutInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
