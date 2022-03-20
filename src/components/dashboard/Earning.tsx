import { OrderProps } from "../../types";

const Earning = (props: OrderProps) => {
  return (
    <div className="bg-gradient-to-r from-yellow-light to-[#fffced] max-w-md p-4 rounded-md mb-4">
      <h1 className="text-2xl font-semibold">
        &#x20B1;
        {props.orders?.reduce(
          (acc, order) => acc + order.product.price * order.numberOfItems,
          0
        )}
      </h1>
      <div className="m-2"></div>
      <h2 className="text-lg font-semibold">Total Earnings</h2>
    </div>
  );
};

export default Earning;
