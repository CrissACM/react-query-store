import type { Product } from "..";

interface GetProdcutsOptions {
  filterKey?: string;
  id?: number;
}

function sleep(seconds: number): Promise<Boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}

export async function getProducts({
  filterKey,
}: GetProdcutsOptions): Promise<Product[]> {
  await sleep(2);

  const filterUrl = filterKey ? `?category=${filterKey}` : "";

  const data = await fetch(`http://localhost:3100/products${filterUrl}`).then(
    (r): Promise<Product[]> => r.json(),
  );

  return data;
}

export async function getProductById({
  id,
}: GetProdcutsOptions): Promise<Product> {
  await sleep(2);

  const data = await fetch(`http://localhost:3100/products/${id}`).then(
    (r): Promise<Product> => r.json(),
  );

  return data;
}
