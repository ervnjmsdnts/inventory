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
import { SalesData, OrderProps } from "../../types";

const SalesChart = (props: OrderProps) => {
  const data: SalesData[] = [];

  props.orders?.forEach((order) => {
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

  data.sort((a, b) => {
    return dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1;
  });

  return (
    <div className="mb-4">
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

export default SalesChart;