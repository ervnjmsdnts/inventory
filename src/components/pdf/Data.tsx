import dayjs from "dayjs";
import { OrderProps } from "../../types";
import TableLayout from "../TableLayout";
import React from "react";

const Data = React.forwardRef((props: OrderProps, ref: any) => {
  const today = new Date();
  const todayOrders = props.orders?.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  });

  const total = todayOrders?.reduce((acc, order) => {
    return acc + order.product.price * order.numberOfItems;
  }, 0);

  return (
    <div ref={ref}>
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
          </tr>
        </thead>
        <tbody className="bg-white w-full divide-y divide-gray-200">
          {todayOrders?.map((order: any) => (
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
      </TableLayout>
      <div className="flex items-center mt-4 ml-4">
        <h2 className="text-2xl font-bold">Total: </h2>
        <h2 className="text-2xl font-bold pl-2">&#x20B1;{total}</h2>
      </div>
    </div>
  );
});

Data.displayName = "Data";

export default Data;
