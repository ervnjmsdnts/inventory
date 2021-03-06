import { OrderProps } from "../../types";

const Earning = (props: OrderProps) => {
  return (
    <div className="bg-gradient-to-r from-yellow-light to-[#fffced] w-full mt-2 md:mt-0 max-w-md p-4 md:rounded-md md:mb-4 drop-shadow-md">
      <h1 className="text-2xl font-semibold">
        &#x20B1;
        {props.orders?.reduce(
          (acc, order: any) => acc + order.product.price * order.numberOfItems,
          0
        )}
      </h1>
      <div className="m-2"></div>
      <h2 className="text-lg font-semibold">Total Earnings</h2>
    </div>
  );
};

export default Earning;
