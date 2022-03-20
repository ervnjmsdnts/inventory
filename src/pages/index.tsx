import { Order } from "@prisma/client";
import dayjs from "dayjs";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { prisma } from "../../lib/prisma";

interface OrderProduct extends Order {
  product: {
    price: number;
  };
}

interface SalesProps {
  orders: OrderProduct[];
}

interface Data {
  date: string;
  total: number;
}

const Dashboard = (props: SalesProps) => {
  return (
    <div className="flex flex-col mx-auto w-3/4 h-screen p-4">
      <Earning orders={props.orders} />
      <DailySales orders={props.orders} />
      {/* Top 5 Tables */}
    </div>
  );
};

const Earning = (props: SalesProps) => {
  return (
    <div className="bg-gradient-to-r from-yellow-light to-[#fffced] max-w-md p-4 rounded-md mb-4">
      <h1 className="text-2xl font-semibold">
        &#x20B1;
        {props.orders.reduce(
          (acc, order) => acc + order.product.price * order.numberOfItems,
          0
        )}
      </h1>
      <div className="m-2"></div>
      <h2 className="text-lg font-semibold">Total Earnings</h2>
    </div>
  );
};

const DailySales = (props: SalesProps) => {
  const data: Data[] = [];

  props.orders.forEach((order) => {
    const date = dayjs(order.createdAt).format("MMM DD, YYYY");
    const found = data.find((d: any) => d.date === date);
    if (found) {
      found.total += order.product.price * order.numberOfItems;
    } else {
      data.push({
        date,
        total: order.product.price * order.numberOfItems,
      });
    }
  });

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Sales Chart</h1>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E4B601" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#E4B601" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area dataKey="total" stroke="#6C4534" fill="url(#color)" />
          <XAxis dataKey="date" axisLine={false} />
          <YAxis
            dataKey="total"
            axisLine={false}
            tickFormatter={(price) => `\u20B1${price}`}
          />
          <Tooltip content={<CustomToolTip />} />
          <CartesianGrid opacity={0.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomToolTip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div className="bg-white border border-brown-dark text-brown-dark p-2 rounded-md">
        <h4>{label}</h4>
        <p className="text-sm">&#x20B1;{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export const getServerSideProps = async () => {
  try {
    const result = await prisma.order.findMany({
      include: {
        product: {
          select: {
            price: true,
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
