import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IngredientProps } from "../../types";
import { CreateIngredientModal } from "./IngredientModals";

const IngredientHeader = (props: IngredientProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-center md:text-left mt-4 md:mt-0">
        Ingredient
      </h1>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-yellow-light mb-2 px-4 py-2 flex mx-auto md:mx-0 items-center rounded-md">
        <div className="pr-4">
          <BiPlus size={24} />
        </div>
        Add Ingredient
      </button>
      <CreateIngredientModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        categories={props.categories}
      />
    </div>
  );
};

export default IngredientHeader;
