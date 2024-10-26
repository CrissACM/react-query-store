import { useQueryClient } from "@tanstack/react-query";
import { productActions } from "..";

export function usePrefetchProduct() {
  const queryClient = useQueryClient();

  const preFetchProduct = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: () => productActions.getProductById({ id }),
      staleTime: 1000 * 60 * 60,
    });
  };

  return preFetchProduct;
}
