export default function changeMoneyFormat(num: number) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  };
  return num.toLocaleString('en-IN', options);
}
