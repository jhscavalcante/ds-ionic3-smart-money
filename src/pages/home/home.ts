import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { NewEntryPage } from "../new-entry/new-entry";
import { AccountProvider } from "../../providers/account/account";

import { Chart } from 'chart.js';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  entries = [];
  currentBalance = 0;

  constructor(public navCtrl: NavController, public account: AccountProvider) {}

  ionViewDidEnter() {
    this.loadData();
  }

  addEntry() {
    this.navCtrl.push(NewEntryPage); // abre a tela (Adicionar Lançamentos)
  }

  private loadData() {
    this.loadBalance();
    this.loadEntries();
  }

  // Carrega o saldo atual (antes feito no contructor da classe)
  private loadBalance() {
    this.account.loadBalance().then(balance => (this.currentBalance = balance));
  }

  // Carrega os lanĂ§amentos
  private loadEntries() {
    this.account.allEntries().then((data: any) => {
      this.entries = data;
    });
  }
}
