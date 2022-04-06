import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { UserConsumer } from "../context/authContext";
import { useEffect, useState } from "react";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = UserConsumer();

  useEffect(() => {
    if (auth.isAuth) {
      router.push("/");
    }
    // eslint-disable-next-line
  }, [auth.isAuth]);

  const onSubmitForm = async (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/api/auth/login",
      data,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await axios(config);

    if (result.status === 200) {
      if (result.data.hasOwnProperty("message")) {
        setError(result.data.message);
        return;
      }
      auth?.login(result.data.authToken);
      router.push("/");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-yellow-light flex items-center justify-center w-[400px] h-[300px] relative rounded-md shadow">
          <div className="absolute -top-12 h-24 w-24">
            <Image
              src="/logo.png"
              alt="Logo"
              layout="fill"
              priority={true}
              className="rounded-full"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmitForm)} className="w-full mt-8">
            <div className="flex">
              <input
                type="text"
                className="w-full bg-gray-100 text-gray-900 rounded-md pl-2 mx-12 h-12 mt-2"
                placeholder="Username"
                {...register("username", { required: true })}
              />
            </div>
            <div className="flex">
              <input
                type="password"
                className="w-full bg-gray-100 text-gray-900 rounded-md pl-2 mx-12 h-12 mt-2"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-yellow-dark text-brown-dark font-semibold rounded-md px-4 py-2">
                Login
              </button>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-red-500 mt-4 text-lg">{error}</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
