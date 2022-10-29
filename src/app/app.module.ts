import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng-lts/button';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { StyleClassModule } from 'primeng-lts/styleclass';
import { PeazySharedModule } from './shared/peazy-shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { SupplierModule } from './features/supplier/supplier.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DatePipe, DecimalPipe } from '@angular/common';
import { OptionsMappingPipe } from './shared/pipes/options-mapping.pipe';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}
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
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    CheckboxModule,
    StyleClassModule,
    PeazySharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LoggerModule.forRoot({
      level: environment.loggingLevel,
      colorScheme: ['gray', 'green', 'blue', 'gray', 'orange', 'red', 'purple']
    }),
  ],
  providers: [
    MessageService,
    DatePipe,
    TranslatePipe,
    ConfirmationService,
    DecimalPipe,
    OptionsMappingPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
