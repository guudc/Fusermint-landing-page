import { Request, Response } from "express";
import { getExchangeRate, CurrencyPair } from "../services/currency";
import { env } from "../config/env";

export const CurrencyController = {
	/**
	 * Convert currency pair (e.g. USD to NGN)
	 * @route POST /wallet/convert
	 * @body { from: string, to: string, amount: number }
	 */
	async convertCurrency(req: Request, res: Response) {
		try {
			const { from, to, amount } = req.body;
			if (!from || !to || typeof amount !== "number") {
				return res.status(400).json({ error: "from, to, and amount are required" });
			}
			const pair: CurrencyPair = `${from.toLowerCase()}-${to.toLowerCase()}` as CurrencyPair;
			const rateData = await getExchangeRate(pair);
			const converted = amount * rateData.rate;
			const quoteFee = amount * (Number(env.FUSERMINT_FEE)/100);
			const bankFee = amount * (Number(0.001)/100); //default to 0.1%
			return res.json({
				from,
				to,
				amount,
				bankFee,
				quoteFee,
				totalFee: quoteFee + bankFee,
				rate: rateData.rate,
				converted,
				lastUpdated: rateData.timestamp,
			});
		} catch (err: any) {
			console.log(err)
			return res.status(500).json({ error: err.message || "Unable to get quote" });
		}
	},
};
