import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { BiStats, BiCategoryAlt } from "react-icons/bi";
import { HiOutlineCube, HiOutlineShoppingCart } from "react-icons/hi";
import { IoMdPaper } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import { FaCubes } from "react-icons/fa";

const Sidebar: React.FC = ({ children }) => {
  return (
    <div className="flex">
      <nav className="bg-yellow-light max-w-xs h-screen flex-grow">
        <SidebarTitle />
        <div className="pt-8"></div>
        <SidebarMenu />
      </nav>
      {children}
    </div>
  );
};

const SidebarTitle: React.FC = () => {
  return (
    <div className="flex justify-evenly items-center pt-4">
      <div className="relative h-16 w-16">
        <Image
          src="/logo.jpg"
          alt="Logo"
          layout="fill"
          className="rounded-full"
        />
      </div>
      <div className="text-center text-brown-dark">
        <h2 className="text-2xl font-extrabold uppercase">Cha Bear</h2>
        <h4 className="text-sm">Milktea | Smoothies | Snacks</h4>
      </div>
    </div>
  );
};

const SidebarMenu: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Link href="/">
        <a className="text-brown-dark flex items-center font-semibold text-lg p-2 hover:bg-white">
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
              className={`flex justify-between items-center w-full text-brown-dark p-2 hover:bg-white ${
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
                <a className="text-brown-dark flex items-center font-semibold text-lg p-2 hover:bg-yellow-dark">
                  <div className="px-4">
                    <BiCategoryAlt size={24} />
                  </div>
                  Category
                </a>
              </Link>
              <Link href="/ingredient">
                <a className="text-brown-dark flex items-center font-semibold text-lg p-2 hover:bg-yellow-dark">
                  <div className="px-4">
                    <IoMdPaper size={24} />
                  </div>
                  Ingredient
                </a>
              </Link>
              <Link href="/product">
                <a className="text-brown-dark flex items-center font-semibold text-lg p-2 hover:bg-yellow-dark">
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
        <a className="text-brown-dark flex items-center font-semibold text-lg p-2 hover:bg-white">
          <div className="px-4">
            <HiOutlineShoppingCart size={24} />
          </div>
          Order
        </a>
      </Link>
    </div>
  );
};

export default Sidebar;
