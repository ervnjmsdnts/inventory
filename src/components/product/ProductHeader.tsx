import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { ProductProps } from "../../types";
import { CreateProductModal } from "./ProductModals";

const ProductHeader = (props: ProductProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-center md:text-left mt-4 md:mt-0">
        Product
      </h1>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-yellow-light mb-2 px-4 py-2 flex items-center mx-auto md:mx-0 rounded-md">
        <div className="pr-4">
          <BiPlus size={24} />
        </div>
        Add Product
      </button>
      <CreateProductModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ingredients={props.ingredients}
      />
    </div>
  );
};

export default ProductHeader;
