import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
//import { FeatureModule } from './features/feature.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioSesionComponent } from'./pages/auth/login/inicio-sesion/inicio-sesion.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    //FeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
