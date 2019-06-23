import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { IndexMainComponent } from './index-main/index-main.component';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {TimeAgoPipe} from 'time-ago-pipe';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupTenantComponent } from './popup-tenant/popup-tenant.component';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    IndexMainComponent,
    PopupTenantComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PopupTenantComponent]
})
export class AppModule { }
