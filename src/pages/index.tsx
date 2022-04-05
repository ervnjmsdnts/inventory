import { prisma } from "../../lib/prisma";
import Earning from "../components/dashboard/Earning";
import SalesChart from "../components/dashboard/SalesChart";
import TopTable from "../components/dashboard/TopTable";
import { OrderProps } from "../types";
import { withAuth } from "../util/withAuth";

const Dashboard = (props: OrderProps) => {
  return (
    <div className="flex flex-col mx-auto w-3/4 h-screen p-4">
      <Earning orders={props.orders} />
      <SalesChart orders={props.orders} />
      <TopTable orders={props.orders} />
    </div>
  );
};

export const getServerSideProps = withAuth(async () => {
  const result = await prisma.order.findMany({
    where: {
      isActive: true,
    },
    include: {
      product: {
        select: {
          price: true,
          name: true,
          status: true,
        },
      },
    },
  });

  const orders = JSON.parse(JSON.stringify(result));

  return {
    props: { orders },
  };
});

export default Dashboard;
