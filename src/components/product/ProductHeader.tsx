import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CreateProductModal } from "./ProductModals";

const ProductHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Product</h1>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-yellow-light mb-2 px-4 py-2 flex items-center rounded-md">
        <div className="pr-4">
          <BiPlus size={24} />
        </div>
        Add Product
      </button>
      <CreateProductModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ProductHeader;
