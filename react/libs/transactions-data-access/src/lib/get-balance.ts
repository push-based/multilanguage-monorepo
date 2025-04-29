export function getBalance(): Promise<number> {
  console.log('hello world');
  return fetch('http://localhost:5087/balance')
    .then((response) => response.json() as Promise<{ amount: number }>)
    .then((data) => data.amount);
}
