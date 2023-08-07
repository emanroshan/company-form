import React from "react";
import { Select, Checkbox } from "antd";

const HeaderFilters = ({
  dataSource,
  columns,
  handleFilterChange,
}) => {
  return (
    <div className="header-filters">
      {columns.map((column) => (
        <Select
          style={{ width: "200px" }}
          value={column.caption}
          mode="multiple"
        >
          {dataSource &&
            dataSource.map((data) => (
              <Select.Option key={data?.[column.id]}>
                <Checkbox
                  value={data?.[column.dataField]}
                  onClick={(e) =>
                    handleFilterChange(
                      column.dataField,
                      e.target.value,
                      e.target.checked
                    )
                  }
                >
                  {data?.[column.dataField]}
                </Checkbox>
              </Select.Option>
            ))}
        </Select>
      ))}
    </div>
  );
};
export default HeaderFilters;
