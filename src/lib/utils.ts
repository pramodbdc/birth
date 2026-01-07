import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dateToWords = (dateStr: string) => {
  if (!dateStr) return "";
  let y, m, d;
  
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    [y, m, d] = dateStr.split("-").map(p => parseInt(p, 10));
  } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const parts = dateStr.split("/");
    d = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10);
    y = parseInt(parts[2], 10);
  } else {
    const dt = new Date(dateStr);
    if (isNaN(dt.getTime())) return "";
    d = dt.getDate();
    m = dt.getMonth() + 1;
    y = dt.getFullYear();
  }

  const small = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"];
  const tensWords = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];
  
  const twoDigits = (n: number) => {
    if (n === 0) return "";
    if (n < 20) return small[n];
    const t = Math.floor(n / 10);
    const r = n % 10;
    return r ? `${tensWords[t]} ${small[r]}` : tensWords[t];
  };

  const threeDigits = (n: number) => {
    const h = Math.floor(n / 100);
    const r = n % 100;
    if (h && r) return `${small[h]} HUNDRED AND ${twoDigits(r)}`;
    if (h && !r) return `${small[h]} HUNDRED`;
    return twoDigits(r);
  };

  const yearToWords = (yr: number) => {
    const thousands = Math.floor(yr / 1000);
    const rem = yr % 1000;
    const thousandsPart = thousands ? `${small[thousands]} THOUSAND` : "";
    if (rem === 0) return thousandsPart;
    const remWords = threeDigits(rem);
    return thousandsPart ? `${thousandsPart} ${remWords}` : remWords;
  };

  const months = ["", "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  
  const dayWord = twoDigits(d);
  const monthWord = months[m];
  const yearWord = yearToWords(y);

  return `${dayWord} -${monthWord}- ${yearWord}`.replace(/\s+/g, " ").trim();
};
