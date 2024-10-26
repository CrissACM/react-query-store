import { useQuery } from "@tanstack/react-query";
import { productActions, type Product } from "..";

interface Options {
  id: number;
}

export function useProduct({ id }: Options) {
  const {
    data: product,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: (): Promise<Product> => productActions.getProductById({ id }),
    staleTime: 1000 * 60 * 60,
  });

  return {
    product,
    isLoading,
    isError,
    error,
    isFetching,
  };
}
