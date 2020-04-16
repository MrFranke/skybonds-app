import React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import { TRawData } from "../types/Data";

type TProps = {
  data: (TRawData & {value: number})[];
}

const shortDateFormat = (date: number) => format(new Date(date), 'dd.MM');
const fullDateFormat = (date: string | number) => format(new Date(date), 'dd.MM.yyyy');
const withCurrencySymbol = (value: number) => `${value}$`;

export const Chart: React.FC<TProps> = ({data}) => (
  <LineChart width={window.innerWidth} height={400} data={data}>
    <Line type="monotone"  dataKey="value" stroke="#8884d8" />
    <YAxis type="number" domain={['dataMin', 'dataMax']} tickFormatter={withCurrencySymbol} />
    <XAxis dataKey="Date" tickFormatter={shortDateFormat} />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <Tooltip labelFormatter={fullDateFormat} />
  </LineChart>
);
