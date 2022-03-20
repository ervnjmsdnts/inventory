import { Category } from "@prisma/client";
import dayjs from "dayjs";
import { useState } from "react";
import { CategoryProps } from "../../types";
import { ErrorStatus, OkayStatus } from "../Status";
import TableLayout from "../TableLayout";
import { UpdateCategoryModal } from "./CategoryModals";

const CategoryTable = (props: CategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<Category>();

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
              Business Status
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
          {props.categories.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {category.id}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{category.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {category.status === "ONGOING" ? (
                  <OkayStatus>{category.status}</OkayStatus>
                ) : (
                  <ErrorStatus>{category.status}</ErrorStatus>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {dayjs(category.createdAt).format("MMMM DD, YYYY")}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setCategory(category);
                  }}
                  type="button"
                  className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableLayout>
      <UpdateCategoryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        category={category}
      />
    </>
  );
};

export default CategoryTable;
