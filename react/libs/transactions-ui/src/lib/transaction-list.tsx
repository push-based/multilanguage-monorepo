export function TransactionList({transactions}: {
  transactions: { label: string; amount: number }[];
}) {
  return (
    <div>
      <h3>Recent Transactions</h3>
      <ul style={{listStyle: 'none', padding: 0}}>
        {transactions.map((tx, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <span>{tx.label}</span>
            <span style={{color: tx.amount < 0 ? 'red' : 'green'}}>
              ${tx.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
