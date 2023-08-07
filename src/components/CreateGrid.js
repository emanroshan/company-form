import React, { useEffect, useState } from "react";
import "devextreme/dist/css/dx.light.css";
import {
  Column,
  TreeList,
  SearchPanel,
} from "devextreme-react/tree-list";
import { useQuery } from "@apollo/client";
import { GET_COMPANIES } from "./constants";
import Selector from "./Filters/Selector";
import { columns, disabledColumns, filteredColumnsValues } from "./constants";
import HeaderFilters from "./Filters/HeaderFilters";

const CreateGrid = () => {
  const { data, loading, error } = useQuery(GET_COMPANIES, {
    variables: {
      pageInfo: {
        pageNo: 1,
        pageSize: 200,
      },
    },
  });

  const [gridData, setGridData] = useState(data?.companies?.data);
  const [filterValues, setFilterValues] = useState({});
  const [filterColumns, setFilterColumns] = useState(disabledColumns);
  const [filterColWithValues, setFilterColWithValues] = useState(filteredColumnsValues)

  useEffect(() => {
    setGridData(data?.companies?.data);
  }, [data]);

  useEffect(() => {
    if (data) {
      const filteredData = data?.companies?.data?.filter((item) => {
        return filterColumns.every((column) => {
          const filterValuesForColumn = filterColWithValues[column.dataField];
          if (filterValuesForColumn && filterValuesForColumn.length > 0) {
            return filterValuesForColumn.includes(item[column.dataField]);
          }
          return true;
        });
      });
      setGridData(filteredData);
    }
  }, [filterColWithValues, data]);
  
  const handleFilterChange = (column, value, checked) => {
    if(checked){
      setFilterColWithValues((prevFilterColWithValues) => ({
        ...prevFilterColWithValues,
        [column]: [...(prevFilterColWithValues[column] || []), value],
      }));
    }
    else{
      setFilterColWithValues((prevFilterColWithValues) => ({
        ...prevFilterColWithValues,
        [column]: prevFilterColWithValues[column].filter((val) => val !== value),
      }));
    }
  };
  

  return (
    <>
      <div className="search-panel">
        <Selector columns={columns} setFilterColumns={setFilterColumns} />
      </div>
      <HeaderFilters
        columns={filterColumns}
        filterValues={filterValues}
        handleFilterChange={handleFilterChange}
        dataSource={data?.companies?.data ? data?.companies?.data : gridData}
      />

      <div className="grid-pager">
        <TreeList
          dataSource={gridData}
          keyExpr={"id"}
          showBorders={true}
          allowColumnReordering={true}
        >
          <SearchPanel visible={true} />
          {columns.map((column) => (
            <Column
              key={column.dataField}
              dataField={column.dataField}
              caption={column.caption}
              width={column.width}
              allowHeaderFiltering={column.allowHeaderFiltering}
            />
          ))}
        </TreeList>
      </div>
    </>
  );
};

export default CreateGrid;
