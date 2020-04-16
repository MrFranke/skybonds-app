import data from '../data/aapl'
import { add, isWithinInterval } from 'date-fns';


export const lastData = new Date(data[data.length - 1].Date);

export const getData = () => data;

export const getByRange = (interval: {start: Date, end: Date}) =>
  data.filter((item) => isWithinInterval(new Date(item.Date), interval));

export const getWeek = () => getByRange({
  start: add(lastData, {weeks: -1}),
  end: lastData
});

export const getMonth = () => getByRange({
  start: add(lastData, {months: -1}),
  end: lastData
});

export const getQuarter = () => getByRange({
  start: add(lastData, {months: -4}),
  end: lastData
});

export const getYear = () => getByRange({
  start: add(lastData, {years: -1}),
  end: lastData
});
