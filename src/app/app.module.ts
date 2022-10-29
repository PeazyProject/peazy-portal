import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng-lts/button';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { StyleClassModule } from 'primeng-lts/styleclass';
import { LaaSSharedModule } from './shared/peazy-shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CheckboxModule,
    StyleClassModule,
    LaaSSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
