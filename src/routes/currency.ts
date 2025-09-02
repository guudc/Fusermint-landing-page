import { Router } from "express";
import { CurrencyController } from "../controllers/curency.controller";

const router = Router();

/**
 * @swagger
 * /currency/quote:
 *   post:
 *     summary: Convert currency pairs
 *     description: Convert an amount from one currency to another (e.g. USD to NGN)
 *     tags:
 *       - Currency
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *                 example: USD
 *               to:
 *                 type: string
 *                 example: NGN
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       '200':
 *         description: Conversion result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 from:
 *                   type: string
 *                 to:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 rate:
 *                   type: number
 *                 converted:
 *                   type: number
 *                 lastUpdated:
 *                   type: number
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Conversion failed
 */
router.post("/quote", CurrencyController.convertCurrency);

export default router;
