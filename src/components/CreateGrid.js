import React, { useEffect, useState, useContext } from "react";
import { EditDataContext } from "../App.js";
import "./CreateGrid.css";
import { useQuery } from "@apollo/client";
import "devextreme/dist/css/dx.light.css";
import {
  Column,
  TreeList,
  SearchPanel,
  Paging,
  Pager,
  Scrolling,
  Editing,
  Lookup,
} from "devextreme-react/tree-list";
import { GET_COMPANIES, statuses } from "./constants";
import Selector from "./Filters/Selector";
import { columns, disabledColumns, filteredColumnsValues, filter_columns } from "./constants";
import HeaderFilters from "./Filters/HeaderFilters";

const allowedPageSizes = [5, 10, 20, 50, 100, 200];

const CreateGrid = () => {
  const { open, setOpen } = useContext(EditDataContext);

  const { data, loading, error } = useQuery(GET_COMPANIES, {
    variables: {
      pageInfo: {
        pageNo: 1,
        pageSize: 200,
        orderBy: {
          sortOrder: "DESC",
          sortKey: "id",
        },
      },
    },
  });

  const [gridData, setGridData] = useState(data?.companies?.data);
  const [filterValues, setFilterValues] = useState({});
  const [filterColumns, setFilterColumns] = useState(disabledColumns);
  const [filterColWithValues, setFilterColWithValues] = useState(
    filteredColumnsValues
  );

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
    if (checked) {
      setFilterColWithValues((prevFilterColWithValues) => ({
        ...prevFilterColWithValues,
        [column]: [...(prevFilterColWithValues[column] || []), value],
      }));
    } else {
      setFilterColWithValues((prevFilterColWithValues) => ({
        ...prevFilterColWithValues,
        [column]: prevFilterColWithValues[column].filter(
          (val) => val !== value
        ),
      }));
    }
  };

  function handleEditData() {
    setOpen(!open);
  }

  return (
    <>
      <div className="search-headers">
        <div className="search-panel">
          <Selector columns={filter_columns} setFilterColumns={setFilterColumns} />
        </div>
        <div className="header-panel">
          <HeaderFilters
            columns={filterColumns}
            filterValues={filterValues}
            handleFilterChange={handleFilterChange}
            dataSource={
              data?.companies?.data ? data?.companies?.data : gridData
            }
          />
        </div>
      </div>

      <div className="grid-pager">
        <TreeList
          dataSource={gridData}
          keyExpr="id"
          showBorders={true}
          allowColumnReordering={true}
          columnChooser={true}
        >
          <Editing mode="cell" allowUpdating={true} />
          <Scrolling mode="standard" />
          <Paging enabled defaultPageSize={10} />

          <Pager
            showPageSizeSelector
            allowedPageSizes={allowedPageSizes}
            showNavigationButtons
            showInfo
            infoText="Rows"
            displayMode="compact"
            visible
          />

          <SearchPanel visible={true} />
          {columns.map((column) => (
            <Column
              key={column.dataField}
              dataField={column.dataField}
              caption={column.caption}
              width={column.width}
              allowHeaderFiltering={column.allowHeaderFiltering}
              allowEditing={column.allowEditing ?? false}
              cellRender={column.cellRender}
              editCellRender={column.editCellRender}
            />
          ))}
          <Lookup dataSource={statuses} displayExpr="name" valueExpr="id" />
        </TreeList>
      </div>
    </>
  );
};

export default CreateGrid;
