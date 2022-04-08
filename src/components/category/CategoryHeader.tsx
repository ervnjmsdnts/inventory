import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CreateCategoryModal } from "./CategoryModals";

const CategoryHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="text-4xl font-bold mt-4 md:mt-0 mb-4 text-center md:text-left">
        Category
      </h1>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-yellow-light mb-2 px-4 py-2 flex items-center mx-auto md:mx-0 rounded-md">
        <div className="pr-4">
          <BiPlus size={24} />
        </div>
        Add Category
      </button>
      <CreateCategoryModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default CategoryHeader;
