export interface PriceData {
    country: string;
    gasolinePrice: number;
    fuelTax: number;
    currency: string;
}

export const fuelPriceData: Record<string, PriceData> = {
    "United States": { country: "United States", gasolinePrice: 0.95, fuelTax: 0.13, currency: "USD" },
    "Canada": { country: "Canada", gasolinePrice: 1.25, fuelTax: 0.28, currency: "USD" },
    "Germany": { country: "Germany", gasolinePrice: 1.95, fuelTax: 0.78, currency: "USD" },
    "United Kingdom": { country: "United Kingdom", gasolinePrice: 1.85, fuelTax: 0.72, currency: "USD" },
    "France": { country: "France", gasolinePrice: 1.99, fuelTax: 0.81, currency: "USD" },
    "Japan": { country: "Japan", gasolinePrice: 1.30, fuelTax: 0.40, currency: "USD" },
    "Australia": { country: "Australia", gasolinePrice: 1.20, fuelTax: 0.30, currency: "USD" },
    "Brazil": { country: "Brazil", gasolinePrice: 1.10, fuelTax: 0.25, currency: "USD" },
    "India": { country: "India", gasolinePrice: 1.22, fuelTax: 0.35, currency: "USD" },
    "China": { country: "China", gasolinePrice: 1.15, fuelTax: 0.33, currency: "USD" },
    "Saudi Arabia": { country: "Saudi Arabia", gasolinePrice: 0.62, fuelTax: 0.05, currency: "USD" },
    "United Arab Emirates": { country: "United Arab Emirates", gasolinePrice: 0.75, fuelTax: 0.00, currency: "USD" },
};
