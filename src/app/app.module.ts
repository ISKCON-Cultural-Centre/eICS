import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { SDKBrowserModule } from './shared/sdk';
import { AuthGuard, AuthService } from './shared/services';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pageNotFound.component';
import { NavgationComponent } from './navgation/navgation.component';
import { RegisterComponent } from './login/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevoteeModule } from '../app/devotee/devotee.module';
import { MyServicesModule } from './my-services/my-services.module';
import { MyActionsModule } from './my-actions/my-actions.module';
import { MyMessagesModule } from './my-messages/my-messages.module';
import { CatalogueModule } from './matchless-gifts/catalogue/catalogue.module';
import { MatchlessGiftsModule } from './matchless-gifts/matchless-gifts.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavgationComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LoginModule,
    HttpModule,
    SDKBrowserModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    DevoteeModule,
    MyServicesModule,
    MyActionsModule,
    MyMessagesModule,
    CatalogueModule,
    MatchlessGiftsModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
