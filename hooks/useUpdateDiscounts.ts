import {useEffect} from "react";
import fetcher from "../utils/swr-fetcher";
import {BasketProduct, Discount} from "../pages/types";

export const useUpdateDiscounts = (products: Array<BasketProduct>, setDiscounts: (discounts: Array<Discount>) => void) => {
  useEffect(() => {
    let stale = false;

    fetcher(
      '/api/update_discounts',
      { post: true, body: products }
    ).then((response) => {
      console.log(response);
      if (!stale) setDiscounts(response?.discounts);
    });

    return () => {
      stale = true;
    }
  }, [products])
}