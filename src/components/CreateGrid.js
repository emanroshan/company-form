import React from "react";
import "./CreateGrid.css";
import { TreeList, Column, Paging, Pager,Scrolling, HeaderFilter, Search } from 'devextreme-react/tree-list';
import { useQuery } from "@apollo/client";
import { DataGrid } from "devextreme-react";
import { Pagination } from "antd";
import { GET_COMPANIES } from "./constants";

const allowedPageSizes = [5, 10, 20];
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
  const gridData = data?.companies?.data;
  const columns = [
    {dataField:"name", caption:"Name"},
    {dataField:"code", caption:"Code"},

  ]
  console.log(gridData)
  return (
    <>


    <DataGrid
        dataSource={gridData}
        keyExpr={"id"}
        showBorders={true}
        allowColumnReordering={true} 
        columns={columns}
    />
    <Pagination defaultCurrent={6} total={40}/>
    </>
  );
};

export default CreateGrid;
