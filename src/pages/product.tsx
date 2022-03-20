import { BiPlus } from "react-icons/bi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { prisma } from "../../lib/prisma";
import { ProductProps } from "../types";
import ProductHeader from "../components/product/ProductHeader";
import ProductTable from "../components/product/ProductTable";

const Product = (props: ProductProps) => {
  return (
    <div className="flex flex-col mx-auto">
      <ProductHeader />
      <ProductTable products={props.products} />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const productResults = await prisma.product.findMany({
      where: {
        isActive: true,
      },
    });

    const products = JSON.parse(JSON.stringify(productResults));

    return {
      props: { products },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Product;
