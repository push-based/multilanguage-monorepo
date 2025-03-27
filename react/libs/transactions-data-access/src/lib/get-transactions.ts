export function getRecentTransactions(): Promise<
  { label: string; amount: number }[]
> {
  return fetch('http://localhost:5087/transactions').then(
    (response) =>
      response.json() as Promise<{ label: string; amount: number }[]>
  );
}
