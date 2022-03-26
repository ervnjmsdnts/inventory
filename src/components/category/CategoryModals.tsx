import { Dialog } from "@headlessui/react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CategoryInput, CategoryModal } from "../../types";
import NProgress from "nprogress";

export const CreateCategoryModal: React.FC<CategoryModal> = ({
  isOpen,
  setIsOpen,
}) => {
  const { register, handleSubmit } = useForm<CategoryInput>();
  const router = useRouter();

  const onSubmitForm: SubmitHandler<CategoryInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/category/create",
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
            Add Category
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter category name"
                {...register("name", { required: true })}
              />
              <div className="px-2"></div>
              <select
                {...register("status", { required: true })}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                <option value="ONGOING">ONGOING</option>
                <option value="STOPPED">STOPPED</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export const UpdateCategoryModal: React.FC<CategoryModal> = ({
  isOpen,
  setIsOpen,
  category,
}) => {
  const { register, handleSubmit, setValue } = useForm<CategoryInput>();
  const router = useRouter();

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("status", category.status);
    }
  }, [category, setValue]);

  const onSubmitForm: SubmitHandler<CategoryInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/category/update",
      data: { id: category?.id, ...data },
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
            Edit Category
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md px-2 h-12 mt-2"
                placeholder="Enter category name"
                {...register("name", { required: true })}
              />
              <div className="px-2"></div>
              <select
                {...register("status")}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md px-2 h-12 mt-2">
                <option value="ONGOING">ONGOING</option>
                <option value="STOPPED">STOPPED</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Edit Category
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
