import { Request, Response } from 'express';
import { CoinGeckoResponse } from '../models/coingeckoMapping';
import axios from 'axios';

export const getMoneroPrice = async (req: Request, res: Response) => {
    try {
        const url = `${process.env.COINGECKO_API}${process.env.MONERO_PARAMS}`;
        const response = await axios.get<CoinGeckoResponse>(url);      
        if (response.data && response.data.monero && response.data.monero.usd !== undefined) {
            res.status(200).json({ price: response.data.monero.usd });
        } else {
            res.status(404).json({ error: 'Monero price not found in the response' });
        }
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
  };