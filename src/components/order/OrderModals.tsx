import { Dialog } from "@headlessui/react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { OrderInput, OrderModal } from "../../types";
import NProgress from "nprogress";

export const CreateOrderModal: React.FC<OrderModal> = ({
  isOpen,
  setIsOpen,
  products,
}) => {
  const { register, handleSubmit } = useForm<OrderInput>();
  const router = useRouter();

  const onSubmitForm: SubmitHandler<OrderInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/order/create",
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
          <Dialog.Title className="text-lg font-bold">Add Order</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter customer name"
                {...register("customerName", { required: true })}
              />
              <div className="px-2"></div>
              <select
                {...register("productId", { required: true })}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                {products?.map((product) => (
                  <option value={product.id} key={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <div className="px-2"></div>
              <input
                type="number"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter number of items"
                {...register("numberOfItems", { required: true })}
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Add Order
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export const UpdateOrderModal: React.FC<OrderModal> = ({
  isOpen,
  setIsOpen,
  products,
  order,
}) => {
  const { register, handleSubmit, setValue } = useForm<OrderInput>();
  const router = useRouter();

  console.log("THIS IS THE PRODUCTS", products);

  useEffect(() => {
    if (order) {
      setValue("customerName", order.customerName);
      setValue("productId", order.productId);
      setValue("numberOfItems", order.numberOfItems);
    }
  }, [order, setValue]);

  const onSubmitForm: SubmitHandler<OrderInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/order/update",
      data: { id: order?.id, ...data },
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
          <Dialog.Title className="text-lg font-bold">Edit Order</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter customer name"
                {...register("customerName", { required: true })}
              />
              <div className="px-2"></div>
              <select
                {...register("productId", { required: true })}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                {products?.map((product) => (
                  <option value={product.id} key={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <div className="px-2"></div>
              <input
                type="number"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter number of items"
                {...register("numberOfItems", { required: true })}
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Edit Order
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
