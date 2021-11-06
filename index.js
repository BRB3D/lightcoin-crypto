class Account {
  constructor(username) {
    this.username = username;
    this.history = [];
  }
  get balance() {
    let balance = 0;
    for (let v of this.history) {
      balance += v.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.history.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.possible()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  possible() {
    return true;
  }
}


class Withdrawal extends Transaction {
  get value() {
    return - this.amount;
  }
  possible() {
    console.log(this.accountbalance - this.amount >= 0);
    return (this.account.balance - this.amount >= 0);
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");
/* console.log(`Starting Value: ${myAccount.balance}`); */

let t3 = new Deposit(120.00, myAccount);
t3.commit();
/* console.log('Transaction 3:', t3); */


let t1 = new Withdrawal(50.25, myAccount);
t1.commit();
/* console.log('Transaction 1:', t1); */

let t2 = new Withdrawal(9.99, myAccount);
t2.commit();
/* console.log('Transaction 2:', t2); */

let t4 = new Withdrawal(59.78, myAccount);
t4.commit();

console.log('Balance:', myAccount.balance);
console.log(`transactions : ${myAccount.history[1].amount}`);
