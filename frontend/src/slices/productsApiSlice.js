import { PRODUCT_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductById:builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const { useGetProductsQuery ,useGetProductByIdQuery} = productApiSlice;
