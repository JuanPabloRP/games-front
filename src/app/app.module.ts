import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './features/games/games.component';
//import { GameDetailComponent } from './features/game-detail/game-detail.component';
import { MessagesComponent } from './features/messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameListComponent } from './features/games/game-list/game-list.component';
import { AddGameComponent } from './features/games/add-game/add-game.component';

@NgModule({
	declarations: [AppComponent, MessagesComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,
		//GameDetailComponent,
		//GamesComponent
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
