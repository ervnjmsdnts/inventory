import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { OrderProps } from "../../types";
import { CreateOrderModal } from "./OrderModals";

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

export default OrderHeader;
