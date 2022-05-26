import { prisma } from "../../lib/prisma";
import { ProductProps } from "../types";
import ProductHeader from "../components/product/ProductHeader";
import ProductTable from "../components/product/ProductTable";
import { withAuth } from "../util/withAuth";

const Product = (props: ProductProps) => {
  return (
    <div className="w-full md:w-auto mx-auto">
      <ProductHeader ingredients={props.ingredients} />
      <ProductTable products={props.products} ingredients={props.ingredients} />
    </div>
  );
};

export const getServerSideProps = withAuth(async () => {
  const productResults = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      ingredients: {
        select: {
          id: true,
          name: true,
          isActive: true,
        },
      },
    },
  });

  const ingredientResults = await prisma.ingredient.findMany({
    where: {
      isActive: true,
    },
  });

  const products = JSON.parse(JSON.stringify(productResults));
  const ingredients = JSON.parse(JSON.stringify(ingredientResults));

  return {
    props: { products, ingredients },
  };
});

export default Product;
