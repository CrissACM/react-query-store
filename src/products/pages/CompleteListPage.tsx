import { ProductList, useProducts } from "..";

export function CompleteListPage() {
  const { products, isLoading } = useProducts({});

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>

      {isLoading && <p>Cargando...</p>}
      <ProductList products={products} />
    </div>
  );
}
