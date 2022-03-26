import { Dialog } from "@headlessui/react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IngredientInput, IngredientModal } from "../../types";
import NProgress from "nprogress";

export const CreateIngredientModal: React.FC<IngredientModal> = ({
  isOpen,
  setIsOpen,
  categories,
}) => {
  const { register, handleSubmit } = useForm<IngredientInput>();
  const router = useRouter();

  const onSubmitForm: SubmitHandler<IngredientInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/ingredient/create",
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
          <Dialog.Title className="text-lg font-bold">
            Add Ingredient
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter ingredient name"
                {...register("name", { required: true })}
              />
              <div className="px-2"></div>
              <input
                type="number"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter ingredient quantity"
                {...register("quantity", { required: true })}
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
                {...register("categoryId", { required: true })}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Add Ingredient
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export const UpdateIngredientModal: React.FC<IngredientModal> = ({
  isOpen,
  setIsOpen,
  ingredient,
  categories,
}) => {
  const { register, handleSubmit, setValue } = useForm<IngredientInput>();
  const router = useRouter();

  useEffect(() => {
    if (ingredient) {
      setValue("name", ingredient.name);
      setValue("quantity", ingredient.quantity);
      setValue("status", ingredient.status);
      setValue("categoryId", ingredient.categoryId);
    }
  }, [ingredient, setValue]);

  const onSubmitForm: SubmitHandler<IngredientInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/ingredient/update",
      data: { id: ingredient?.id, ...data },
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
            Edit Ingredient
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter ingredient name"
                {...register("name", { required: true })}
              />
              <div className="px-2"></div>
              <input
                type="number"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter ingredient quantity"
                {...register("quantity", { required: true })}
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
                {...register("categoryId", { required: true })}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Edit Ingredient
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
