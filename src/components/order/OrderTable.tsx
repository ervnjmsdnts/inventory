import { Order } from "@prisma/client";
import dayjs from "dayjs";
import { useState } from "react";
import { OrderProps } from "../../types";
import TableLayout from "../TableLayout";
import { UpdateOrderModal } from "./OrderModals";

const OrderTable = (props: OrderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<Order>();

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
