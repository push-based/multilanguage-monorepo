// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import {useEffect, useState} from "react";
import {getBalance, getRecentTransactions} from "@nx-multilanguage-monorepo/react-transactions-data-access";
import {BalanceCard, TransactionList} from "@nx-multilanguage-monorepo/react-transactions-ui";

export function App() {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<
    { label: string; amount: number }[]
  >([]);

  useEffect(() => {
    getBalance().then(setBalance).catch(console.error);
    getRecentTransactions().then(setTransactions).catch(console.error);
  }, []);

  return (
    <div style={{padding: '2rem', fontFamily: 'Arial, sans-serif'}}>
      <h1 style={{marginBottom: '2rem'}}>Online Banking</h1>
      {balance !== null && <BalanceCard balance={balance}/>}
      <TransactionList transactions={transactions}/>
    </div>
  );
}

export default App;
