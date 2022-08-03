import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import useSwr from 'swr';

import { BasketContext } from '../_app';

import { ProductResponse } from '../api/menu/[id]';
import fetcher from '../../utils/swr-fetcher';

import { Card } from '../../components/Card';
import { PageHeader } from '../../components/Header';
import { Footer, MenuSection, PageGrid } from '../../components/layout';

const Menu: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { addToCart } = useContext(BasketContext);

  const { data: menuData, error } = useSwr<ProductResponse>(
    `/api/menu/${id}`,
    fetcher
  );

  return (
    <>
      <Head>
        <title>Marina Hotel and Restaurant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageGrid>
        <PageHeader>Marina Hotel and Restaurant</PageHeader>

        <MenuSection>
          {error && error.message}
          {menuData?.products?.map((product) => (
            <Card
              onClick={addToCart(product)}
              decoratorStyle="add"
              key={product.id}
            >
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Card>
          ))}
        </MenuSection>

        <Footer>Powered by wi-Q</Footer>
      </PageGrid>
    </>
  );
};

export default Menu;
