import type { NextPage } from 'next';
import Head from 'next/head';
import useSwr from 'swr';

import { MenuResponse } from './api/menus';
import { Footer, MenuSection, PageGrid } from '../components/layout';
import { Card } from '../components/Card';
import { PageHeader } from '../components/Header';
import fetcher from '../utils/swr-fetcher';
import Link from 'next/link';

const Home: NextPage = () => {
  const { data: menuData, error } = useSwr<MenuResponse>('/api/menus', fetcher);

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
          {menuData?.menus?.map((menu) => (
            <Link key={menu.id} href={`/menu/${menu.id}`}>
              <Card href={`/menu/${menu.id}`}>{menu.name}</Card>
            </Link>
          ))}
        </MenuSection>

        <Footer>Powered by wi-Q</Footer>
      </PageGrid>
    </>
  );
};

export default Home;
