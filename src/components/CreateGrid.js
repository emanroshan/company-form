import React, { useState } from "react";
import "./CreateGrid.css";
import { TreeList, Column, Paging, Pager,Scrolling, HeaderFilter, Search } from 'devextreme-react/tree-list';
import { useQuery } from "@apollo/client";
import { DataGrid } from "devextreme-react";
import { Pagination } from "antd";
import { GET_COMPANIES } from "./constants";

const CreateGrid = ({ todos }) => {
  const PAGE_INFO = {
    pageInfo: {
      pageNo: 1,
      pageSize: 200,
    },
  };

  const { data, loading, error } =  useQuery(GET_COMPANIES, {
    variables: {
      pageInfo: {
        pageNo: 1,
        pageSize: 200,
      },
    },
  });

  const columns = [
    {
      dataField: "name",
      caption: "Name",
      width: 200,
      allowHeaderFiltering: true,
    },
    { dataField: "code", caption: "Code", width: 200 },
    { dataField: "status", caption: "Status", width: 200 },
    { dataField: "description", caption: "Description", width: 200 },
    { dataField: "classification", caption: "Classification", width: 200 },
    { dataField: "address", caption: "Address", width: 200 },
    { dataField: "city", caption: "City", width: 200 },
    { dataField: "state", caption: "State", width: 200 },
    { dataField: "country", caption: "Country", width: 200 },
  ];
  const gridData = data?.companies?.data;

 // const allowedPageSizes = [5, 10, 20, 50, 100, 200];
  console.log(gridData);
  return (
    <>
      <div className="search-panel">
        <DataGrid>
          <SearchPanel
            visible={true}
            highlightCaseSensitive={false}
            width={240}
            placeholder="Search..."
            className={"grid-search"}
          />

          <Search enabled={true} width={200} />
        </DataGrid>
      </div>

      <div className="grid-pager">
        <DataGrid
          dataSource={gridData}
          keyExpr={"id"}
          showBorders={true}
          allowColumnReordering={true}
        >
          
         
          {columns.map((column) => (
            <Column
              key={column.dataField}
              dataField={column.dataField}
              caption={column.caption}
              width={column.width}
              allowHeaderFiltering={column.allowHeaderFiltering}
            />
          ))}
        </DataGrid>
      </div>
    </>
  );
};

export default CreateGrid;
