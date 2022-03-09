import { BiPlus } from "react-icons/bi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Product, Status } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ErrorStatus, OkayStatus } from "../components/Status";
import dayjs from "dayjs";

interface ProductProps {
  products: Product[];
}

interface ProductInput {
  name: string;
  price: number;
  status: Status;
}

interface ProductModal {
  product?: Product | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Product = (props: ProductProps) => {
  return (
    <div className="flex flex-col mx-auto">
      <ProductHeader />
      <ProductTable products={props.products} />
    </div>
  );
};

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

const CreateProductModal: React.FC<ProductModal> = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit } = useForm<ProductInput>();
  const router = useRouter();

  const onSubmitForm: SubmitHandler<ProductInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/product/create",
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
          <Dialog.Title className="text-lg font-bold">Add Product</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter product name"
                {...register("name")}
              />
              <div className="px-2"></div>
              <input
                type="number"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter product price"
                {...register("price")}
              />
              <div className="px-2"></div>
              <select
                {...register("status")}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="NOTAVAILABLE">NOTAVAILABLE</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

const ProductTable = (props: ProductProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product>();

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
                        <div className="text-sm text-gray-900">
                          {product.name}
                        </div>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <UpdateProductModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        product={product}
      />
    </>
  );
};

const UpdateProductModal: React.FC<ProductModal> = ({
  isOpen,
  setIsOpen,
  product,
}) => {
  const { register, handleSubmit, setValue } = useForm<ProductInput>();
  const router = useRouter();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("status", product.status);
    }
  }, [product, setValue]);

  const onSubmitForm: SubmitHandler<ProductInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/product/update",
      data: { id: product?.id, ...data },
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
            Edit Product
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter product name"
                {...register("name")}
              />
              <div className="px-2"></div>
              <input
                type="number"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter product price"
                {...register("price")}
              />
              <div className="px-2"></div>
              <select
                {...register("status")}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="NOTAVAILABLE">NOTAVAILABLE</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Edit Product
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export const getServerSideProps = async () => {
  try {
    const productResults = await prisma.product.findMany();

    const products = JSON.parse(JSON.stringify(productResults));

    return {
      props: { products },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Product;
