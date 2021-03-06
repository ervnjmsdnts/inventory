import { OrderProps } from "../../types";
import TableLayout from "../TableLayout";

const TopTable = (props: OrderProps) => {
  return (
    <div className="flex flex-col w-3/4 mx-auto md:w-full">
      <TopProducts orders={props.orders} />
      <div className="p-4"></div>
      <TopOrders orders={props.orders} />
    </div>
  );
};

const TopProducts = (props: OrderProps) => {
  const products = props.orders?.reduce((acc: any, curr: any) => {
    if (acc.hasOwnProperty(curr.product.name)) {
      acc[curr.product.name] += curr.numberOfItems;
    } else {
      acc[curr.product.name] = curr.numberOfItems;
    }
    return acc;
  }, {});

  const topProducts = Object.keys(products)
    .sort((a: any, b: any) => products[b] - products[a])
    .slice(0, 5);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 mt-4 md:mt-0 text-center md:text-left">
        Top 5 Products
      </h2>
      <TableLayout>
        <thead className="bg-yellow-dark">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              No. of Items Sold
            </th>
          </tr>
        </thead>
        <tbody className="bg-white w-full divide-y divide-gray-200">
          {topProducts.map((product) => (
            <tr key={product}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex items-center">
                  <div className="text-sm leading-5 font-medium text-gray-900">
                    {product}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  {products[product]}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableLayout>
    </div>
  );
};

const TopOrders = (props: OrderProps) => {
  const orders = props.orders?.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const topOrders = orders?.slice(0, 5);
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2 mt-4 md:mt-0 text-center md:text-left">
        Top 5 Orders
      </h2>
      <TableLayout>
        <thead className="bg-yellow-dark">
          <tr>
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
          </tr>
        </thead>
        <tbody className="bg-white w-full divide-y divide-gray-200">
          {topOrders?.map((order: any) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex items-center">
                  <div className="text-sm leading-5 font-medium text-gray-900">
                    {order.customerName}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="flex items-center">
                  <div className="text-sm leading-5 font-medium text-gray-900">
                    {order.product.name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  {order.numberOfItems}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  &#x20B1;{order.product.price * order.numberOfItems}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableLayout>
    </div>
  );
};

export default TopTable;
