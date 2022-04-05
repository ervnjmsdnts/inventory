import { prisma } from "../../lib/prisma";
import CategoryHeader from "../components/category/CategoryHeader";
import CategoryTable from "../components/category/CategoryTable";
import { CategoryProps } from "../types";
import { withAuth } from "../util/withAuth";

const Category = (props: CategoryProps) => {
  return (
    <div className="flex flex-col mx-auto">
      <CategoryHeader />
      <CategoryTable categories={props.categories} />
    </div>
  );
};

export const getServerSideProps = withAuth(async () => {
  const result = await prisma.category.findMany({
    where: {
      isActive: true,
    },
  });

  const categories = JSON.parse(JSON.stringify(result));

  return {
    props: { categories },
  };
});

export default Category;
