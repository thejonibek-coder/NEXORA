export function formatUZS(amount) {
  if (!amount && amount !== 0) return '0 so‘m';
  const formatted = new Intl.NumberFormat('uz-UZ').format(Math.round(amount));
  return `${formatted} so‘m`;
}

export function formatUZSShort(amount) {
  if (amount >= 1_000_000) {
    const m = (amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1);
    return `${m} mln so‘m`;
  }
  if (amount >= 1_000) {
    const k = Math.round(amount / 1_000);
    return `${k} ming so‘m`;
  }
  return `${amount} so‘m`;
}

export function formatPhone(value) {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('998')) digits = digits.slice(3);
  if (digits.length > 9) digits = digits.slice(0, 9);
  let result = '+998';
  if (digits.length > 0) result += ` (${digits.slice(0, 2)}`;
  if (digits.length >= 2) result += `) ${digits.slice(2, 5)}`;
  if (digits.length >= 5) result += `-${digits.slice(5, 7)}`;
  if (digits.length >= 7) result += `-${digits.slice(7, 9)}`;
  return result;
}

export function generateOrderNumber() {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `#NEX-${num}`;
}

export function generateId() {
  return `prod_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export function discountPercent(original, current) {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'instant' });
}
