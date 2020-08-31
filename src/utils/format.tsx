export const currencyFormat = (number: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
};

export const incomeFormat = (value: string): string => {
  const formattedIncome = value
    .replace(/\D/g, '')
    .replace(/(\d)(\d{2})$/, '$1,$2')
    .replace(/(\d{1,3})(?=(\d{3})+(?!\d))/g, '$1.');

  return formattedIncome;
};

export const dayMonthYearFormat = (value: string): string => {
  const date = new Date(value);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  return `${day}-${month}-${year}`;
};

export const incomeUnformat = (value: string): number => {
  const unformattedIncome = value.replace(/\./g, '').replace(',', '.');

  return Number(unformattedIncome);
};

export const yearMonthDayFormat = (value: string): string => {
  const [date, hour] = value.split('T');
  hour;
  return date;
};
