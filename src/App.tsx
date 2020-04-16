import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useReducer } from 'react';
import { ButtonGroup, DropdownButton } from "react-bootstrap";
import { format } from 'date-fns';
import { RangeButton } from "./components/RangeButton";
import { getData, getMonth, getQuarter, getWeek, getYear } from "./services/api";
import { TypeDropdownItem } from "./components/TypeDropdownItem";
import { Chart } from "./components/Chart";
import { TFormattedData, TRawData } from "./types/Data";

const withSpread = (data: TRawData[]): TFormattedData[] => data.map((i) => ({
    ...i,
    value: Number((i.High - i.Low).toFixed(3))
  })
);

const withPrice = (data: TRawData[]): TFormattedData[] => data.map((i) => ({
    ...i,
    value: i.Close
  })
);

const withVolume = (data: TRawData[]): TFormattedData[] => data.map((i) => ({
    ...i,
    value: i.Volume
  })
);

const initState = {
  data: withPrice(getData()),
  type: 'price',
  range: 'max'
};

const getRange = (range: string, type: string) => {
  let data = [];
  switch (range) {
    case 'week':
      data = getWeek();
      break;
    case 'month':
      data = getMonth();
      break;
    case 'quarter':
      data = getQuarter();
      break;
    case 'year':
      data = getYear();
      break;
    case 'max':
    default:
      data = getData();
      break
  }

  switch (type) {
    case 'price':
      return withPrice(data);
    case 'spread':
      return withSpread(data);
    case 'volume':
      return withVolume(data);
    default:
      throw new Error('Incorrect chart type');
  }
};

const reducer = (state: typeof initState, action: {type: string}) => {
  switch (action.type) {
    case 'range.week':
      return {...state, range: 'week', data: getRange('week', state.type)};
    case 'range.month':
      return {...state, range: 'month', data: getRange('month', state.type)};
    case 'range.quarter':
      return {...state, range: 'quarter', data: getRange('quarter', state.type)};
    case 'range.year':
      return {...state, range: 'year', data: getRange('year', state.type)};
    case 'range.max':
      return {...state, range: 'max', data: getRange('max', state.type)};
    case 'type.price':
      return {...state, type: 'price', data: getRange(state.range, 'price')};
    case 'type.spread':
      return {...state, type: 'spread', data: getRange(state.range, 'spread')};
    case 'type.volume':
      return {...state, type: 'volume', data: getRange(state.range, 'volume')};
    default:
      return state;
  }
};

const isEqStr = (left: string) => (right: string) => left === right;

function App() {
  const [{data, range, type}, dispatch] = useReducer(reducer, initState);
  const isCurrentRange = isEqStr(range);
  const isCurrentType = isEqStr(type);
  const lastDay = data[data.length - 1];

  return (
    <div>
      <h1>AAPL {lastDay.Close}<small>USD</small></h1>
      <p>AAPL, till {format(lastDay.Date, 'dd.MM.yyy')}</p>
      <hr/>
      <div>
        <ButtonGroup aria-label="Basic example" toggle={true}>
          <RangeButton isActive={isCurrentRange} range={'week'} label={'Week'} dispatch={dispatch} />
          <RangeButton isActive={isCurrentRange} range={'month'} label={'Month'} dispatch={dispatch} />
          <RangeButton isActive={isCurrentRange} range={'quarter'} label={'Quarter'} dispatch={dispatch} />
          <RangeButton isActive={isCurrentRange} range={'year'} label={'Year'} dispatch={dispatch} />
          <RangeButton isActive={isCurrentRange} range={'max'} label={'Max'} dispatch={dispatch} />
        </ButtonGroup>

        <Chart data={data} />

        <DropdownButton id="dropdown-basic-button" title={'Chart type'}>
          <TypeDropdownItem isActive={isCurrentType} type={'price'} label={'Price'} dispatch={dispatch} />
          <TypeDropdownItem isActive={isCurrentType} type={'spread'} label={'Spread'} dispatch={dispatch} />
          <TypeDropdownItem isActive={isCurrentType} type={'volume'} label={'Volume'} dispatch={dispatch} />
        </DropdownButton>
      </div>
    </div>
  );
}

export default App;
