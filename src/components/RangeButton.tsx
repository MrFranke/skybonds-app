import React, { Dispatch } from "react";
import { Button } from "react-bootstrap";

type TProps = {
  range: string;
  dispatch: Dispatch<{type: string}>;
  label: string;
  isActive: (range: string) => boolean;
}

export const RangeButton: React.FC<TProps> = ({range, dispatch, label, isActive}) => (
  <Button variant="secondary"
          active={isActive(range)}
          onClick={() => dispatch({type: `range.${range}`})}>{label}</Button>
);
