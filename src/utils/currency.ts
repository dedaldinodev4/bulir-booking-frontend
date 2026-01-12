
export const formattedCurrency = (amount: string): string =>{
  const convertedAmount = Number(amount); 
  const formatted = new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    minimumFractionDigits: 2,
  }).format(convertedAmount)
  return formatted;
};