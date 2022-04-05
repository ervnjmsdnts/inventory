import { prisma } from "../../lib/prisma";
import { ProductProps } from "../types";
import ProductHeader from "../components/product/ProductHeader";
import ProductTable from "../components/product/ProductTable";
import { withAuth } from "../util/withAuth";

const Product = (props: ProductProps) => {
  return (
    <div className="flex flex-col mx-auto">
      <ProductHeader />
      <ProductTable products={props.products} />
    </div>
  );
};

export const getServerSideProps = withAuth(async () => {
  const productResults = await prisma.product.findMany({
    where: {
      isActive: true,
    },
  });

  const products = JSON.parse(JSON.stringify(productResults));

  return {
    props: { products },
  };
});

export default Product;
