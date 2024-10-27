import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useProductMutation } from "..";

interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export function NewProduct() {
  const productMutation = useProductMutation();

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "Teclado",
      price: 123456,
      image:
        "https://assets-prd.ignimgs.com/2022/08/08/key-height-1659999343695.JPG",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti in delectus expedita at et, dolor aperiam tenetur veniam, autem quae cumque alias tempore vero cum necessitatibus qui quidem iure doloremque.",
      category: "men's clothing",
    },
  });

  const newImage = watch("image");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    productMutation.mutate(data);
  };

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value?.toString()}
                  onChange={(ev) => field.onChange(+ev)}
                  className="mt-2"
                  type="number"
                  label="Precio del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="url"
                  label="Url del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  label="Descripción del producto"
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              type="submit"
              className="mt-2"
              color="primary"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? "Cargando..." : "Crear producto"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src={newImage} />
          </div>
        </div>
      </form>
    </div>
  );
}
