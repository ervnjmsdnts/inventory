import { prisma } from "../../lib/prisma";
import Earning from "../components/dashboard/Earning";
import SalesChart from "../components/dashboard/SalesChart";
import TopTable from "../components/dashboard/TopTable";
import { SalesProps } from "../types";

const Dashboard = (props: SalesProps) => {
  return (
    <div className="flex flex-col mx-auto w-3/4 h-screen p-4">
      <Earning orders={props.orders} />
      <div className="m-2"></div>
      <SalesChart orders={props.orders} />
      <div className="m-2"></div>
      <TopTable orders={props.orders} />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const result = await prisma.order.findMany({
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
  } catch (error) {
    console.log(error);
  }
};

export default Dashboard;
