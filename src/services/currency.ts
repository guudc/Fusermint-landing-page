/**
 * Exchange rate API utility
 */

import { env } from "../config/env";

const SIX_HOURS = 6 * 60 * 60 * 1000;
export type ExchangeRateResponse = {
    base: string;
    target: string;
    rate: number;
    timestamp: number; // Unix timestamp (s)
};

export type CurrencyPair = `${string}-${string}`;

/**
 * Cache object for exchange rates
 * Keys will look like: "usd-ngn"
 */
const EXCHANGE_RATES: Record<CurrencyPair, ExchangeRateResponse> = {};

/**
 * Fetch USD to Naira exchange rate
 */
export async function getFxRate(from:string, to:string): Promise<ExchangeRateResponse> {
    const url = `https://v6.exchangerate-api.com/v6/${env.EXCHANGE_RATE_API_KEY}/pair/${from}/${to}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch exchange rate: ${res.statusText}`);
    }
    const data = (await res.json()) as any;
    if ((data?.result as any) !== 'success') {
        throw new Error(`Exchange rate for ${from}-${to} not found in response`);
    }
    return {
        base: from.toUpperCase(),
        target: to.toUpperCase(),
        rate: data?.conversion_rate,
        timestamp: Math.floor(new Date(Date.now()).getTime() / 1e3),
    };
}


/**
 * Get exchange rate for a given currency pair with caching
 * @param currencyPair - e.g. "usd-ngn" or "ngn-usd"
 */
export async function getExchangeRate(
    currencyPair: CurrencyPair
): Promise<ExchangeRateResponse> {
    const key = currencyPair.toLowerCase() as CurrencyPair;
    const cached = EXCHANGE_RATES[key];
    const [from, to] = currencyPair.split("-")
    if (cached && Date.now() - cached.timestamp < SIX_HOURS) {
        return cached; // ✅ return cache if not expired
    }
    //check for usd-ngn
    if (key === "usd-ngn") {
        const rate = await getFxRate(from, to);
        EXCHANGE_RATES[key] = rate;
        return rate;
    }
    // check for ngn-usd
    if (key === "ngn-usd") {
        // Check if usd-ngn is cached and valid
        const usdNgnKey = "usd-ngn" as CurrencyPair;
        const usdNgnCached = EXCHANGE_RATES[usdNgnKey];
        let usdNgn: ExchangeRateResponse;
        if (usdNgnCached && Date.now() - usdNgnCached.timestamp < SIX_HOURS) {
            usdNgn = usdNgnCached;
        } else {
            usdNgn = await getExchangeRate("usd-ngn");
        }
        const inverted: ExchangeRateResponse = {
            base: "NGN",
            target: "USD",
            rate: 1 / usdNgn.rate,
            timestamp: Math.floor(new Date(Date.now()).getTime() / 1e3),
        };
        EXCHANGE_RATES[key] = inverted;
        return inverted;
    }
    throw new Error(`Currency pair ${currencyPair} not supported yet`);
}