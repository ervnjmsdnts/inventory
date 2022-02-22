import { Category, CategoryStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ErrorStatus, OkayStatus } from "../components/Status";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { BiPlus } from "react-icons/bi";
import axios, { AxiosRequestConfig } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import dayjs from "dayjs";

interface CategoryProps {
  categories: Category[];
}

interface CategoryInput {
  name: string;
  status: CategoryStatus;
}

interface CategoryModal {
  category?: Category | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Category = (props: CategoryProps) => {
  return (
    <div className="flex flex-col mx-auto">
      <CategoryHeader />
      <CategoryTable categories={props.categories} />
    </div>
  );
};

const CategoryHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Category</h1>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-yellow-light mb-2 px-4 py-2 flex items-center rounded-md">
        <div className="pr-4">
          <BiPlus size={24} />
        </div>
        Add Category
      </button>
      <CreateCategoryModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const CreateCategoryModal: React.FC<CategoryModal> = ({
  isOpen,
  setIsOpen,
}) => {
  const { register, handleSubmit } = useForm<CategoryInput>();
  const router = useRouter();

  const onSubmitForm: SubmitHandler<CategoryInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/category/create",
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
            Add Category
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter category name"
                {...register("name", { required: true })}
              />
              <div className="px-2"></div>
              <select
                {...register("status")}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                <option value="ONGOING">ONGOING</option>
                <option value="STOPPED">STOPPED</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

const CategoryTable = (props: CategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<Category>();

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
                        <div className="text-sm text-gray-900">
                          {category.name}
                        </div>
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
              </table>
            </div>
          </div>
        </div>
      </div>
      <UpdateCategoryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        category={category}
      />
    </>
  );
};

const UpdateCategoryModal: React.FC<CategoryModal> = ({
  isOpen,
  setIsOpen,
  category,
}) => {
  const { register, handleSubmit, setValue } = useForm<CategoryInput>();
  const router = useRouter();

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("status", category.status);
    }
  }, [category, setValue]);

  const onSubmitForm: SubmitHandler<CategoryInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/category/update",
      data: { id: category?.id, ...data },
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
            Edit Category
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md px-2 h-12 mt-2"
                placeholder="Enter category name"
                {...register("name", { required: true })}
              />
              <div className="px-2"></div>
              <select
                {...register("status")}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md px-2 h-12 mt-2">
                <option value="ONGOING">ONGOING</option>
                <option value="STOPPED">STOPPED</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Edit Category
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export const getServerSideProps = async () => {
  try {
    const result = await prisma.category.findMany();

    const categories = JSON.parse(JSON.stringify(result));

    return {
      props: { categories },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Category;
