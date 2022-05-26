import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { UserConsumer } from "../context/authContext";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";

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
      <div className="flex flex-col md:flex-row items-center justify-evenly md:h-screen py-16">
        <div className="flex justify-center flex-col items-center mb-16 md:m-0">
          <h1 className="text-5xl text-gray-800 font-bold">Welcome Back!</h1>
          <p className="text-xl text-gray-500">Please enter your details</p>
          <div className="relative h-32 w-32 mt-8">
            <Image
              src="/logo.png"
              alt="Logo"
              layout="fill"
              className="rounded-full"
              priority={true}
            />
          </div>
          <Slider />
        </div>
        <div className="bg-yellow-light w-full md:w-2/5 md:rounded-3xl">
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col px-24 md:px-48 py-64 gap-4">
            <h2 className="text-4xl font-bold text-black mb-4">Login</h2>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold">Username</p>
              <input
                type="text"
                className="w-full bg-gray-100 text-gray-900 rounded-md pl-2 h-12"
                placeholder="Enter your username..."
                {...register("username", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold">Password</p>
              <input
                type="password"
                className="w-full bg-gray-100 text-gray-900 rounded-md pl-2 h-12"
                placeholder="Enter your password..."
                {...register("password", { required: true })}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-yellow-dark text-brown-dark font-semibold rounded-md text-lg mt-4 px-16 py-2">
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
