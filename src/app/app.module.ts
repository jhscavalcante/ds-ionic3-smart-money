import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { IonicStorageModule } from "@ionic/storage";
import { SQLite } from "@ionic-native/sqlite";

import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { NewEntryPageModule } from "../pages/new-entry/new-entry.module";
import { DatabaseProvider } from '../providers/database/database';
import { EntryDaoProvider } from '../providers/entry-dao/entry-dao';
import { CategoryDaoProvider } from '../providers/category-dao/category-dao';
import { AccountProvider } from '../providers/account/account';

import { ComponentsModule } from '../components/components.module'

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    NewEntryPageModule,
    ComponentsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatabaseProvider,
    EntryDaoProvider,
    CategoryDaoProvider,
    AccountProvider
  ]
})
export class AppModule {}
