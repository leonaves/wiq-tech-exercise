// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';

import { Product } from '../../types';
import * as MenuData from './data.json';
import path from 'path';

export type ProductResponse = {
  products: Array<Product>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResponse>
) {
  const { id: reqId } = req.query;

  try {
    const menuData: typeof MenuData = await fs
      .readFile(
        path.resolve(process.cwd(), 'pages', 'api', 'menu', 'data.json')
      )
      .then((data) => data.toString())
      .then(JSON.parse);

    const products = menuData.menus.reduce(
      (products: Array<Product>, menu) =>
        menu.id.toString() === reqId
          ? [...products, ...menu.products]
          : products,
      []
    );

    res.status(200).json({ products });
  } catch (e) {
    console.log('[API Error]:', e);

    res.status(500).end();
  }
}
