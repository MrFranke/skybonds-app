import React, { Dispatch } from "react";
import { Dropdown } from "react-bootstrap";

type TProps = {
  type: string;
  dispatch: Dispatch<{type: string}>;
  label: string;
  isActive: (type: string) => boolean;
}

export const TypeDropdownItem: React.FC<TProps> = ({type, dispatch, label, isActive}) => (
  <Dropdown.Item active={isActive(type)} onClick={() => dispatch({type: `type.${type}`})}>{label}</Dropdown.Item>
);
