import React, { useState } from "react";
import { Select, Checkbox } from "antd";
import { disabledColumns } from "../constants";

const Selector = (props) => {

  const setCloumns = (value) => {
    if (props.setFilterColumns) {
      props.setFilterColumns((prevState) => {
        if (prevState.includes(value)) {
          return prevState.filter((column) => column !== value);
        } else {
          return [...prevState, value];
        }
      });
    }
  };
  const disabledCols = ["name", "code"];

  return (
    <>
      <Select
        mode="multiple"
        value="Filters"
        style={{
          width: 120,
        }}
        allowClear={false}
        showSearch={false}
      >
        {props.columns.map((column) => (
          <Select.Option value={column.caption}>
            <Checkbox
              onClick={() => setCloumns(column)}
              disabled={disabledCols.includes(column.dataField)}
              {...disabledCols.includes(column.dataField) && {
                checked: true,
              }}
            >
              {column.caption}
            </Checkbox>
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default Selector;
