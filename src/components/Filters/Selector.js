import React from "react";
import { Select, Checkbox } from "antd";

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
  const disabledCols = ["name", "currentStateCode"];
 
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
          <Select.Option value={column.caption} className="filter-menu-option">
            <Checkbox
              onClick={() => setCloumns(column)}
              disabled={disabledCols.includes(column.dataField)}
              {...(disabledCols.includes(column.dataField) && {
                checked: true,
              })}
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
