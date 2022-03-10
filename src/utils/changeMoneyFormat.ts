export default function changeMoneyFormat(num: number) {
  // example: 789000 => $7,89,000
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  };
  return num.toLocaleString('en-IN', options);
}
