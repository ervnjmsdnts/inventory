import { Product } from "@prisma/client";
import axios, { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { ProductProps } from "../../types";
import { ErrorStatus, OkayStatus } from "../Status";
import TableLayout from "../TableLayout";
import { UpdateProductModal } from "./ProductModals";

const ProductTable = (props: ProductProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product>();
  const router = useRouter();

  const deleteProduct = async (id: string) => {
    const config: AxiosRequestConfig = {
      url: "/api/product/delete",
      data: { id },
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
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Status
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
          {props.products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {product.id}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  &#x20B1;{product.price}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.status === "AVAILABLE" ? (
                  <OkayStatus>{product.status}</OkayStatus>
                ) : (
                  <ErrorStatus>{product.status}</ErrorStatus>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {dayjs(product.createdAt).format("MMMM DD, YYYY")}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setProduct(product);
                  }}
                  type="button"
                  className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => deleteProduct(product.id)}
                  type="button"
                  className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableLayout>
      <UpdateProductModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={product}
      />
    </>
  );
};

export default ProductTable;
