import { Ingredient, Category, Status } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ErrorStatus, OkayStatus } from "../components/Status";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { BiPlus } from "react-icons/bi";
import axios, { AxiosRequestConfig } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import dayjs from "dayjs";

interface IngredientCategory extends Ingredient {
  Category: Category;
}

interface IngredientProps {
  ingredients?: IngredientCategory[];
  categories?: Category[];
}

interface IngredientInput {
  name: string;
  quantity: number;
  status: Status;
  categoryId: string;
}

interface IngredientModal {
  ingredient?: Ingredient | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categories?: Category[];
}

const Category = (props: IngredientProps) => {
  return (
    <div className="flex flex-col mx-auto">
      <IngredientHeader categories={props.categories} />
      <IngredientTable
        ingredients={props.ingredients}
        categories={props.categories}
      />
    </div>
  );
};

const IngredientHeader = (props: IngredientProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Ingredient</h1>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-yellow-light mb-2 px-4 py-2 flex items-center rounded-md">
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

const CreateIngredientModal: React.FC<IngredientModal> = ({
  isOpen,
  setIsOpen,
  categories,
}) => {
  const { register, handleSubmit } = useForm<IngredientInput>();
  const router = useRouter();

  const onSubmitForm: SubmitHandler<IngredientInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/ingredient/create",
      data,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await axios(config);

    if (result.status === 200) {
      router.reload();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex mt-4 max-w-2xl mx-auto">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white w-full rounded p-4">
          <Dialog.Title className="text-lg font-bold">
            Add Ingredient
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter ingredient name"
                {...register("name")}
              />
              <div className="px-2"></div>
              <input
                type="number"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter ingredient quantity"
                {...register("quantity")}
              />
            </div>
            <div className="flex">
              <select
                {...register("status")}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="NOTAVAILABLE">NOTAVAILABLE</option>
              </select>
              <div className="px-2"></div>
              <select
                {...register("categoryId")}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Add Ingredient
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

const IngredientTable = (props: IngredientProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredient, setIngredient] = useState<Ingredient>();

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Created At
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white w-full divide-y divide-gray-200">
                  {props.ingredients?.map((ingredient) => (
                    <tr key={ingredient.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {ingredient.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ingredient.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ingredient.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ingredient.status === "AVAILABLE" ? (
                          <OkayStatus>{ingredient.status}</OkayStatus>
                        ) : (
                          <ErrorStatus>{ingredient.status}</ErrorStatus>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {ingredient.Category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {dayjs(ingredient.createdAt).format("MMMM DD, YYYY")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setIsOpen(true);
                            setIngredient(ingredient);
                          }}
                          type="button"
                          className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <UpdateIngredientModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ingredient={ingredient}
        categories={props.categories}
      />
    </>
  );
};

const UpdateIngredientModal: React.FC<IngredientModal> = ({
  isOpen,
  setIsOpen,
  ingredient,
  categories,
}) => {
  const { register, handleSubmit, setValue } = useForm<IngredientInput>();
  const router = useRouter();

  useEffect(() => {
    if (ingredient) {
      setValue("name", ingredient.name);
      setValue("quantity", ingredient.quantity);
      setValue("status", ingredient.status);
      setValue("categoryId", ingredient.categoryId);
    }
  }, [ingredient, setValue]);

  const onSubmitForm: SubmitHandler<IngredientInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/ingredient/update",
      data: { id: ingredient?.id, ...data },
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await axios(config);

    if (result.status === 200) {
      router.reload();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex mt-4 max-w-2xl mx-auto">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white w-full rounded p-4">
          <Dialog.Title className="text-lg font-bold">
            Edit Ingredient
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter ingredient name"
                {...register("name")}
              />
              <div className="px-2"></div>
              <input
                type="number"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter ingredient quantity"
                {...register("quantity")}
              />
            </div>
            <div className="flex">
              <select
                {...register("status")}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="NOTAVAILABLE">NOTAVAILABLE</option>
              </select>
              <div className="px-2"></div>
              <select
                {...register("categoryId")}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Edit Ingredient
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export const getServerSideProps = async () => {
  try {
    const ingredientResults = await prisma.ingredient.findMany({
      include: {
        Category: {
          select: {
            name: true,
          },
        },
      },
    });

    const categoryResults = await prisma.category.findMany({
      where: {
        status: "ONGOING",
      },
    });

    const ingredients = JSON.parse(JSON.stringify(ingredientResults));
    const categories = JSON.parse(JSON.stringify(categoryResults));

    return {
      props: { ingredients, categories },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Category;
