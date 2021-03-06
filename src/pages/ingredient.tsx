import { prisma } from "../../lib/prisma";
import IngredientHeader from "../components/ingredient/IngredientHeader";
import IngredientTable from "../components/ingredient/IngredientTable";
import { IngredientProps } from "../types";
import { withAuth } from "../util/withAuth";

const Ingredient = (props: IngredientProps) => {
  return (
    <div className="w-full mx-auto md:w-auto">
      <IngredientHeader categories={props.categories} />
      <IngredientTable
        ingredients={props.ingredients}
        categories={props.categories}
      />
    </div>
  );
};

export const getServerSideProps = withAuth(async () => {
  const ingredientResults = await prisma.ingredient.findMany({
    where: {
      isActive: true,
    },
    include: {
      Category: {
        select: {
          name: true,
        },
      },
    },
  });

  const categoryResults = await prisma.category.findMany({
    where: {
      status: "ONGOING",
    },
  });

  const ingredients = JSON.parse(JSON.stringify(ingredientResults));
  const categories = JSON.parse(JSON.stringify(categoryResults));

  return {
    props: { ingredients, categories },
  };
});

export default Ingredient;
