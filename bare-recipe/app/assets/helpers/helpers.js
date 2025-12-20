

export function decimalToFraction(decimal) {
  if (isNaN(decimal) || decimal === null || decimal === '') {
    return decimal?.toString?.() || '';
  }

  if (Number.isInteger(decimal)) {
    return decimal.toString();
  }

  const sign = decimal < 0 ? '-' : '';
  decimal = Math.abs(decimal);

  // Tighter rounding for common recipe fractions
  const commonDenominators = [2, 3, 4, 8, 16];

  // Find the closest common denominator fraction
  let bestNum = 0;
  let bestDen = 1;
  let minDiff = Infinity;

  for (const den of commonDenominators) {
    const num = Math.round(decimal * den);
    const diff = Math.abs(decimal - num / den);
    if (diff < minDiff) {
      minDiff = diff;
      bestNum = num;
      bestDen = den;
    }
  }

  // Simplify the fraction
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const divisor = gcd(bestNum, bestDen);
  let num = bestNum / divisor;
  let den = bestDen / divisor;

  // Convert improper to mixed fraction
  const whole = Math.floor(num / den);
  const remainder = num % den;

  if (remainder === 0) return `${sign}${whole}`;
  if (whole === 0) return `${sign}${remainder}/${den}`;
  return `${sign}${whole} ${remainder}/${den}`;
}



// export function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }