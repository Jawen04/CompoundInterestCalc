function calculateCompoundInterest(principal, monthlyContribution, annualRate, years) {
    const r = annualRate / 100;
    const n = 12;
    const t = years;
  
    const compoundFactor = Math.pow(1 + r / n, n * t);
    const principalFutureValue = principal * compoundFactor;
    const contributionFutureValue = monthlyContribution * ((compoundFactor - 1) / (r / n));
  
    const totalAmount = principalFutureValue + contributionFutureValue;
    const totalContributed = principal + (monthlyContribution * 12 * t);
    const growth = totalAmount - totalContributed;
    const accumulatedSavings = monthlyContribution * 12 * years
  
    return {
      total: totalAmount,
      growth: growth,
      accumulatedSavings: accumulatedSavings
    };
  }
  
 export default calculateCompoundInterest;