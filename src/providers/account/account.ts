import { Injectable } from "@angular/core";
import { EntryDaoProvider } from "../entry-dao/entry-dao";
import { CategoryDaoProvider } from "../category-dao/category-dao";

@Injectable()
export class AccountProvider {
  private balance = 0; // saldo

  constructor(
    public entryDao: EntryDaoProvider,
    public categoryDao: CategoryDaoProvider
  ) {}

  addEntry(amount, categoryId) {
    this.balance += Number(amount);

    return this.entryDao.insert(amount, categoryId).then(() => {
      console.log("New entry added");
    });
  }

  currentBalance() {
    return this.balance;
  }

  allEntries() {
    return this.entryDao.getAll();
  }

  // Calcula o saldo no momento de inicialização da classe
  loadBalance() {
    console.log("load balance");

    return this.entryDao.getBalance().then(balance => {
      this.balance = Number(balance);
      return this.balance;
    });
  }
}
