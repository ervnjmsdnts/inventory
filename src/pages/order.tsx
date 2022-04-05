import { prisma } from "../../lib/prisma";
import OrderHeader from "../components/order/OrderHeader";
import OrderTable from "../components/order/OrderTable";
import { OrderProps } from "../types";
import { withAuth } from "../util/withAuth";

const Order = (props: OrderProps) => {
  return (
    <div className="flex flex-col mx-auto">
      <OrderHeader products={props.products} />
      <OrderTable orders={props.orders} products={props.products} />
    </div>
  );
};

export const getServerSideProps = withAuth(async () => {
  const orderResults = await prisma.order.findMany({
    where: {
      isActive: true,
    },
    include: {
      product: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });

  const productResults = await prisma.product.findMany({
    where: {
      status: "AVAILABLE",
    },
  });

  const orders = JSON.parse(JSON.stringify(orderResults));
  const products = JSON.parse(JSON.stringify(productResults));

  return {
    props: { orders, products },
  };
});

export default Order;
