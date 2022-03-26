import axios, { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { OrderProps } from "../../types";
import TableLayout from "../TableLayout";
import { UpdateOrderModal } from "./OrderModals";
import NProgress from "nprogress";

const OrderTable = (props: OrderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<any>();
  const router = useRouter();

  const deleteOrder = async (id: string) => {
    const config: AxiosRequestConfig = {
      url: "/api/order/delete",
      data: { id },
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
    <>
      <TableLayout>
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
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white w-full divide-y divide-gray-200">
          {props.orders?.map((order: any) => (
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
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setOrder(order);
                  }}
                  type="button"
                  className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => deleteOrder(order.id)}
                  type="button"
                  className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableLayout>
      <UpdateOrderModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        order={order}
        products={props.products}
      />
    </>
  );
};

export default OrderTable;
