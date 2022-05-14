import { Dialog } from "@headlessui/react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductInput, ProductModal } from "../../types";
import NProgress from "nprogress";

export const CreateProductModal: React.FC<ProductModal> = ({
  isOpen,
  setIsOpen,
  ingredients,
}) => {
  const { register, handleSubmit } = useForm<ProductInput>();
  const router = useRouter();

  const onSubmitForm: SubmitHandler<ProductInput> = async (data) => {
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
            <div className="flex">
              <select
                {...register("status", { required: true })}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="NOTAVAILABLE">NOTAVAILABLE</option>
              </select>
              <div className="px-2"></div>
              <select
                {...register("ingredientId", { required: true })}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                {ingredients?.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Add Product
            </button>
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
  const { register, handleSubmit, setValue } = useForm<ProductInput>();
  const router = useRouter();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("status", product.status);
      setValue("ingredientId", product.ingredientId);
    }
  }, [product, setValue]);

  const onSubmitForm: SubmitHandler<ProductInput> = async (data) => {
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
            <div className="flex">
              <select
                {...register("status", { required: true })}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="NOTAVAILABLE">NOTAVAILABLE</option>
              </select>
              <div className="px-2"></div>
              <select
                {...register("ingredientId", { required: true })}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                {ingredients?.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.id}>
                    {ingredient.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Edit Product
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
