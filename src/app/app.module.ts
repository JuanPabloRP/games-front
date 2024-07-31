import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './core/features/messages/messages.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GamesEffects } from './store/effects/games.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './store/app.state';

import { SignInComponent } from './core/features/auth/sign-in/sign-in.component';
import { SignUpComponent } from './core/features/auth/sign-up/sign-up.component';
import { IndexComponent } from './core/features/index/index.component';
import { NavbarComponent } from './core/shared/navbar/navbar.component';
import { FooterComponent } from './core/shared/footer/footer.component';
import { AuthComponent } from './core/features/auth/auth.component';
import { PublicLayoutComponent } from './core/layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './core/layouts/private-layout/private-layout.component';

@NgModule({
	declarations: [
		AppComponent,
		MessagesComponent,
		SignInComponent,
		SignUpComponent,
		IndexComponent,
		NavbarComponent,
		FooterComponent,
		AuthComponent,
  PublicLayoutComponent,
  PrivateLayoutComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		StoreModule.forRoot(ROOT_REDUCERS),
		EffectsModule.forRoot([GamesEffects]),
		StoreDevtoolsModule.instrument({ name: 'TEST' }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
