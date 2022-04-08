import { Disclosure, Menu } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { BiStats, BiCategoryAlt } from "react-icons/bi";
import { HiOutlineCube, HiOutlineShoppingCart } from "react-icons/hi";
import { IoMdPaper } from "react-icons/io";
import { FiChevronDown, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { FaCubes } from "react-icons/fa";
import { useRouter } from "next/router";
import { UserConsumer } from "../context/authContext";
import axios, { AxiosRequestConfig } from "axios";

const Sidebar: React.FC = ({ children }) => {
  return (
    <>
      <MobileNav />
      <div className="flex h-full">
        <nav className="hidden md:block max-w-xs self-start h-screen sticky top-0 bg-yellow-light flex-grow">
          <SidebarTitle />
          <div className="pt-4"></div>
          <SidebarMenu />
        </nav>
        {children}
      </div>
    </>
  );
};

const MobileNav: React.FC = () => {
  const auth = UserConsumer();
  return (
    <nav className="md:hidden flex">
      <div className="bg-yellow-light w-full flex items-center justify-between">
        <div className="w-full">
          <Menu>
            <div className="flex justify-between p-2">
              <div className="relative h-12 w-12">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  layout="fill"
                  className="rounded-full"
                  priority={true}
                />
              </div>
              <Menu.Button>
                <div className="flex">
                  <FiMenu size={24} />
                </div>
              </Menu.Button>
            </div>
            <Menu.Items>
              <Menu.Item>
                <Link href="/">
                  <a className="flex items-center text-lg p-2 font-semibold">
                    <div className="m-2">
                      <BiStats />
                    </div>
                    Dashboard
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex justify-between items-center w-full p-2 hover:bg-white ${
                          open ? "bg-white" : ""
                        }`}>
                        <div className="flex items-center font-semibold text-lg">
                          <div className="m-2">
                            <FaCubes />
                          </div>
                          Inventory
                        </div>
                        <div
                          className={`${open ? "transform rotate-180" : ""}`}>
                          <FiChevronDown />
                        </div>
                      </Disclosure.Button>
                      <Disclosure.Panel className="flex flex-col bg-white pl-2">
                        <Link href="/category">
                          <a className="flex items-center text-lg p-2 font-semibold">
                            <div className="m-2">
                              <BiCategoryAlt />
                            </div>
                            Category
                          </a>
                        </Link>
                        <Link href="/ingredient">
                          <a className="flex items-center text-lg p-2 font-semibold">
                            <div className="m-2">
                              <IoMdPaper />
                            </div>
                            Ingredient
                          </a>
                        </Link>
                        <Link href="/product">
                          <a className="flex items-center text-lg p-2 font-semibold">
                            <div className="m-2">
                              <HiOutlineCube />
                            </div>
                            Product
                          </a>
                        </Link>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </Menu.Item>
              <Menu.Item>
                <Link href="/order">
                  <a className="flex items-center text-lg p-2 font-semibold">
                    <div className="m-2">
                      <HiOutlineShoppingCart />
                    </div>
                    Order
                  </a>
                </Link>
              </Menu.Item>
              {auth.user?.role === "ADMIN" && (
                <Menu.Item>
                  <Link href="/order">
                    <a className="flex items-center text-lg p-2 font-semibold">
                      <div className="m-2">
                        <FiUser />
                      </div>
                      User
                    </a>
                  </Link>
                </Menu.Item>
              )}
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

const SidebarTitle: React.FC = () => {
  const auth = UserConsumer();
  return (
    <>
      <div className="flex justify-evenly items-center pt-4">
        <div className="relative h-16 w-16">
          <Image
            src="/logo.png"
            alt="Logo"
            layout="fill"
            className="rounded-full"
            priority={true}
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-extrabold uppercase">Cha Bear</h2>
          <h4 className="text-sm">Milktea | Smoothies | Snacks</h4>
        </div>
      </div>
      <div className="p-2"></div>
      <div className="flex justify-center font-semibold text-yellow-dark text-lg bg-white p-4">
        {`${auth.user?.name} | ${auth.user?.role}`}
      </div>
    </>
  );
};

const SidebarMenu: React.FC = () => {
  const auth = UserConsumer();
  const router = useRouter();

  const logout = async () => {
    auth.logout();
    const config: AxiosRequestConfig = {
      url: "/api/auth/logout",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios(config);
    router.replace("/login");
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col">
        <Link href="/">
          <a
            className={`flex items-center font-semibold text-lg p-2 hover:bg-white ${
              router.asPath === "/" && "bg-yellow-dark"
            }`}>
            <div className="px-4">
              <BiStats size={24} />
            </div>
            Dashboard
          </a>
        </Link>
        <div className="py-2"></div>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`flex justify-between items-center w-full p-2 hover:bg-white ${
                  open ? "bg-white" : ""
                }`}>
                <div className="flex items-center text-brown-dar font-semibold text-lg">
                  <div className="px-4">
                    <FaCubes size={24} />
                  </div>
                  Inventory
                </div>
                <div className={`${open ? "transform rotate-180" : ""}`}>
                  <FiChevronDown />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="flex flex-col bg-white">
                <Link href="/category">
                  <a
                    className={`flex items-center font-semibold text-lg p-2 hover:bg-yellow-dark ${
                      router.asPath === "/category" && "bg-yellow-dark"
                    }`}>
                    <div className="px-4">
                      <BiCategoryAlt size={24} />
                    </div>
                    Category
                  </a>
                </Link>
                <Link href="/ingredient">
                  <a
                    className={`flex items-center font-semibold text-lg p-2 hover:bg-yellow-dark ${
                      router.asPath === "/ingredient" && "bg-yellow-dark"
                    }`}>
                    <div className="px-4">
                      <IoMdPaper size={24} />
                    </div>
                    Ingredient
                  </a>
                </Link>
                <Link href="/product">
                  <a
                    className={`flex items-center font-semibold text-lg p-2 hover:bg-yellow-dark ${
                      router.asPath === "/product" && "bg-yellow-dark"
                    }`}>
                    <div className="px-4">
                      <HiOutlineCube size={24} />
                    </div>
                    Product
                  </a>
                </Link>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <div className="py-2"></div>
        <Link href="/order">
          <a
            className={`flex items-center font-semibold text-lg p-2 hover:bg-white ${
              router.asPath === "/order" && "bg-yellow-dark"
            }`}>
            <div className="px-4">
              <HiOutlineShoppingCart size={24} />
            </div>
            Order
          </a>
        </Link>
        <div className="py-2"></div>
        {auth.user?.role === "ADMIN" && (
          <Link href="/user">
            <a
              className={`flex items-center font-semibold text-lg p-2 hover:bg-white ${
                router.asPath === "/user" && "bg-yellow-dark"
              }`}>
              <div className="px-4">
                <FiUser size={24} />
              </div>
              User
            </a>
          </Link>
        )}
      </div>
      <div className="flex flex-col absolute bottom-0 left-0 right-0">
        <button
          type="button"
          onClick={logout}
          className="flex items-center font-semibold text-lg p-2 hover:bg-white">
          <div className="px-4">
            <FiLogOut size={24} />
          </div>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
