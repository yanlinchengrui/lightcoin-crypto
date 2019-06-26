let balance = 500.00;

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if(this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      console.log('Yea!');
    }
    else {
      console.log('Nope!');
    }
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance < this.amount ? false : true;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let rez = 0;
    this.transactions.forEach((transaction) => rez += transaction.value);
    return rez;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(110.00, myAccount);
t2.commit();

const t3 = new Withdrawal(20.00, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);
