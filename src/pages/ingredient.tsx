import { prisma } from "../../lib/prisma";
import IngredientHeader from "../components/ingredient/IngredientHeader";
import IngredientTable from "../components/ingredient/IngredientTable";
import { IngredientProps } from "../types";

const Ingredient = (props: IngredientProps) => {
  return (
    <div className="flex flex-col mx-auto">
      <IngredientHeader categories={props.categories} />
      <IngredientTable
        ingredients={props.ingredients}
        categories={props.categories}
      />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const ingredientResults = await prisma.ingredient.findMany({
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
  } catch (error) {
    console.log(error);
  }
};

export default Ingredient;
