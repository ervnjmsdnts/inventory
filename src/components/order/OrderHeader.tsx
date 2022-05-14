import { useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useReactToPrint } from "react-to-print";
import { OrderProps } from "../../types";
import Data from "../pdf/Data";
import { CreateOrderModal } from "./OrderModals";

const OrderHeader = (props: OrderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pdfRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  return (
    <div>
      <div className="hidden">
        <Data
          orders={props.orders}
          products={props.products}
          ref={pdfRef}></Data>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center md:text-left mt-4 md:mt-0">
        Order
      </h1>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-yellow-light mb-2 px-4 py-2 flex items-center rounded-md mx-auto md:mx-0">
          <div className="pr-4">
            <BiPlus size={24} />
          </div>
          Add Order
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="bg-yellow-light mb-2 px-4 py-2 flex items-center rounded-md mx-auto md:mx-0">
          <div className="pr-4">
            <BiPlus size={24} />
          </div>
          Download Today&apos;s Order
        </button>
      </div>
      <CreateOrderModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        products={props.products}
      />
    </div>
  );
};

export default OrderHeader;
