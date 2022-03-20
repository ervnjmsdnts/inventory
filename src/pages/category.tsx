import { Category, CategoryStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ErrorStatus, OkayStatus } from "../components/Status";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { BiPlus } from "react-icons/bi";
import axios, { AxiosRequestConfig } from "axios";
import CategoryHeader from "../components/category/CategoryHeader";
import CategoryTable from "../components/category/CategoryTable";
import { CategoryProps } from "../types";

const Category = (props: CategoryProps) => {
  return (
    <div className="flex flex-col mx-auto">
      <CategoryHeader />
      <CategoryTable categories={props.categories} />
    </div>
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
