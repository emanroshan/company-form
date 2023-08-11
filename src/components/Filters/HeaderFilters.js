import React from "react";
import { Select, Checkbox } from "antd";

const HeaderFilters = ({
  dataSource,
  columns,
  handleFilterChange,
}) => {
  const uniqueValuesMap = {};

  columns.forEach((column) => {
    uniqueValuesMap[column.dataField] = new Set();
  });

  if (dataSource) {
    dataSource.forEach((data) => {
      columns.forEach((column) => {
        const fieldValue = data[column.dataField];
        if (fieldValue !== undefined) {
          uniqueValuesMap[column.dataField].add(fieldValue);
        }
      });
    });
  }

  return (
    <div className="header-filters">
      {columns.map((column) => (
        <Select
          key={column.dataField}
          value={column.caption}
          mode="multiple"
        >
          {Array.from(uniqueValuesMap[column.dataField]).map((value) => (
            <Select.Option key={value} className="filter-menu-option">
              <Checkbox
                value={value}
                onClick={(e) =>
                  handleFilterChange(column.dataField, e.target.value, e.target.checked)
                }
              >
                {value}
              </Checkbox>
            </Select.Option>
          ))}
        </Select>
      ))}
    </div>
  );
};

export default HeaderFilters;
