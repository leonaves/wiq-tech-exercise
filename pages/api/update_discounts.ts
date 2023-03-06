// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';

import {Discount} from '../types';
import fetcher from "../../utils/swr-fetcher";

export type DiscountResponse = {
    discounts: Array<Discount>;
};

export type ResponseError = {
    error: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DiscountResponse | ResponseError>
) {
    const products = req.body;

    const body = await fetcher(
      'https://mock-api-server.fly.dev/update_discounts',
      { post: true, body: { products } }
    );

    const discounts = body.discounts;

    if (!discounts) {
        return res.status(500).json({
            error: `Couldn't get discounts from API.`,
        });
    }

    return res.status(200).json({ discounts });
}
