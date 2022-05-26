import { Dialog } from "@headlessui/react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { ProductModal } from "../../types";
import NProgress from "nprogress";
import { BiMinus } from "react-icons/bi";

export const CreateProductModal: React.FC<ProductModal> = ({
  isOpen,
  setIsOpen,
  ingredients,
}) => {
  const { register, handleSubmit, control } = useForm<any>({
    defaultValues: {
      name: "",
      price: "",
      status: "AVAILABLE",
      ingredients: [{}],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });
  const router = useRouter();

  const onSubmitForm: SubmitHandler<any> = async (data) => {
    console.log("data", data);
    const config: AxiosRequestConfig = {
      url: "/api/product/create",
      data,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    NProgress.start();

    const result = await axios(config);

    if (result.status === 200) {
      NProgress.done();
      router.reload();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex mt-4 max-w-2xl mx-auto">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white w-full rounded p-4">
          <Dialog.Title className="text-lg font-bold">Add Product</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter product name"
                {...register("name", { required: true })}
              />
              <div className="px-2"></div>
              <input
                type="number"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter product price"
                {...register("price", { required: true })}
              />
            </div>
            <select
              {...register("status", { required: true })}
              className="bg-gray-100 w-full text-gray-900 rounded-md pl-2 h-12 mt-2">
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="NOTAVAILABLE">NOTAVAILABLE</option>
            </select>
            <h3 className="text-lg font-bold">Ingredients:</h3>
            {fields.map((field, index) => {
              return (
                <div className="flex gap-2" key={field.id}>
                  <select
                    {...register(`ingredients[${index}].ingredientId`, {
                      required: true,
                    })}
                    className="w-full bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                    {ingredients?.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.id}>
                        {ingredient.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="text-2xl"
                    onClick={() => remove(index)}>
                    <BiMinus />
                  </button>
                </div>
              );
            })}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
                Add Product
              </button>
              <button
                type="button"
                onClick={() => append({})}
                className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
                Add Ingredient
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export const UpdateProductModal: React.FC<ProductModal> = ({
  isOpen,
  setIsOpen,
  product,
  ingredients,
}) => {
  const { register, handleSubmit, setValue, control } = useForm<any>();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "ingredients",
  });
  const router = useRouter();

  console.log("product", product);

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("status", product.status);
      replace(
        product.ingredients.map((ingredient: any) => {
          return {
            ingredientId: ingredient.id,
          };
        })
      );
    }
  }, [product, setValue, replace]);

  const onSubmitForm: SubmitHandler<any> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/product/update",
      data: { id: product?.id, ...data },
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    NProgress.start();

    const result = await axios(config);

    if (result.status === 200) {
      NProgress.done();
      router.reload();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex mt-4 max-w-2xl mx-auto">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white w-full rounded p-4">
          <Dialog.Title className="text-lg font-bold">
            Edit Product
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter product name"
                {...register("name", { required: true })}
              />
              <div className="px-2"></div>
              <input
                type="number"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter product price"
                {...register("price", { required: true })}
              />
            </div>
            <select
              {...register("status", { required: true })}
              className="bg-gray-100 w-full text-gray-900 rounded-md pl-2 h-12 mt-2">
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="NOTAVAILABLE">NOTAVAILABLE</option>
            </select>
            <h3 className="text-lg font-bold">Ingredients:</h3>
            {fields.map((field, index) => {
              return (
                <div className="flex gap-2" key={field.id}>
                  <select
                    {...register(`ingredients[${index}].ingredientId`, {
                      required: true,
                    })}
                    className="w-full bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                    {ingredients?.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.id}>
                        {ingredient.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="text-2xl"
                    onClick={() => remove(index)}>
                    <BiMinus />
                  </button>
                </div>
              );
            })}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
                Edit Product
              </button>
              <button
                type="button"
                onClick={() => append({})}
                className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
                Add Ingredient
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
