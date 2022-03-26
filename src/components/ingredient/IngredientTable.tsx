import axios, { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { IngredientProps } from "../../types";
import { ErrorStatus, OkayStatus } from "../Status";
import TableLayout from "../TableLayout";
import { UpdateIngredientModal } from "./IngredientModals";
import NProgress from "nprogress";

const IngredientTable = (props: IngredientProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredient, setIngredient] = useState<any>();
  const router = useRouter();

  const deleteIngredient = async (id: string) => {
    const config: AxiosRequestConfig = {
      url: "/api/ingredient/delete",
      data: { id },
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };

    NProgress.start();

    const result = await axios(config);

    if (result.status === 200) {
      NProgress.done();
      router.reload();
    }
  };

  return (
    <>
      <TableLayout>
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
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white w-full divide-y divide-gray-200">
          {props.ingredients?.map((ingredient: any) => (
            <tr key={ingredient.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {ingredient.id}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{ingredient.name}</div>
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
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => deleteIngredient(ingredient.id)}
                  type="button"
                  className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableLayout>
      <UpdateIngredientModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ingredient={ingredient}
        categories={props.categories}
      />
    </>
  );
};

export default IngredientTable;
