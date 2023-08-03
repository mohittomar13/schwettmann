import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { MatUiModule } from './mat-ui.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    MatUiModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AuthModule,
    ShoppingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
