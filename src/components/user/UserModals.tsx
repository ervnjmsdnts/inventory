import { Dialog } from "@headlessui/react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserInput, UserModal } from "../../types";
import NProgress from "nprogress";

export const CreateUserModal: React.FC<UserModal> = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit } = useForm<UserInput>();
  const router = useRouter();

  const onSubmitForm: SubmitHandler<UserInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/auth/register",
      data,
      method: "POST",
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
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex mt-4 max-w-2xl mx-auto">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white w-full rounded p-4">
          <Dialog.Title className="text-lg font-bold">Add User</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter first name"
                {...register("firstName", { required: true })}
              />
              <div className="px-2"></div>
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter last name"
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter username"
                {...register("username", { required: true })}
              />
              <div className="px-2"></div>
              <input
                type="password"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
              <div className="px-2"></div>
              <select
                {...register("role", { required: true })}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                <option value="STAFF">STAFF</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-yellow-dark rounded-md px-4 py-2 mt-4">
              Add User
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export const UpdateUserModal: React.FC<UserModal> = ({
  isOpen,
  setIsOpen,
  user,
}) => {
  const { register, handleSubmit, setValue } = useForm<UserInput>();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("username", user.username);
      setValue("role", user.role);
    }
  }, [user, setValue]);

  const onSubmitForm: SubmitHandler<UserInput> = async (data) => {
    const config: AxiosRequestConfig = {
      url: "/api/auth/update",
      data: { id: user?.id, ...data },
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
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter first name"
                {...register("firstName", { required: true })}
              />
              <div className="px-2"></div>
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter last name"
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="flex">
              <input
                type="text"
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2"
                placeholder="Enter username"
                {...register("username", { required: true })}
              />
              <div className="px-2"></div>
              <select
                {...register("role", { required: true })}
                className="w-1/2 bg-gray-100 text-gray-900 rounded-md pl-2 h-12 mt-2">
                <option value="STAFF">STAFF</option>
                <option value="ADMIN">ADMIN</option>
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
