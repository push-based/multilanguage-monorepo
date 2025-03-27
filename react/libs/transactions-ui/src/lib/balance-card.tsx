export function BalanceCard({ balance }: { balance: number }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3>Account Balance</h3>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${balance.toFixed(2)}</p>
    </div>
  );
}
