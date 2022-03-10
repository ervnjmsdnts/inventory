import { Order, Product } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { BiPlus } from "react-icons/bi";
import axios, { AxiosRequestConfig } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import dayjs from "dayjs";

interface OrderProduct extends Order {
  product: Product;
}

interface OrderProps {
  orders?: OrderProduct[];
  products?: Product[];
}

interface OrderInput {
  customerName: string;
  productId: string;
  numberOfItems: number;
}

interface OrderModal {
  order?: Order | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  products?: Product[];
}

const Order = (props: OrderProps) => {
  return (
    <div className="flex flex-col mx-auto">
      <OrderHeader products={props.products} />
      <OrderTable orders={props.orders} />
    </div>
  );
};

const OrderHeader = (props: OrderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Order</h1>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-yellow-light mb-2 px-4 py-2 flex items-center rounded-md">
        <div className="pr-4">
          <BiPlus size={24} />
        </div>
        Add Order
      </button>
      <CreateOrderModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        products={props.products}
      />
    </div>
  );
};

const CreateOrderModal: React.FC<OrderModal> = ({
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

    const result = await axios(config);

    if (result.status === 200) {
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
                {...register("customerName")}
              />
              <div className="px-2"></div>
              <select
                {...register("productId")}
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
                {...register("numberOfItems")}
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

const OrderTable = (props: OrderProps) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-yellow-dark">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      No. of Items
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white w-full divide-y divide-gray-200">
                  {props.orders?.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.customerName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.numberOfItems}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          &#x20B1;{order.product.price * order.numberOfItems}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {dayjs(order.createdAt).format("MMMM DD, YYYY")}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const orderResults = await prisma.order.findMany({
      include: {
        product: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    const productResults = await prisma.product.findMany({
      where: {
        status: "AVAILABLE",
      },
    });

    const orders = JSON.parse(JSON.stringify(orderResults));
    const products = JSON.parse(JSON.stringify(productResults));

    return {
      props: { orders, products },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Order;
