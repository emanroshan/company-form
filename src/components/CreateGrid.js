import React, { useState } from "react";
import "./CreateGrid.css";
import { TreeList, Paging, Pager, Scrolling } from "devextreme-react/tree-list";
import { useQuery, gql } from "@apollo/client";
import DataGrid, {
  Column,
  Search,
  SearchPanel,
  FilterRow,
} from "devextreme-react/data-grid";
import { Pagination } from "antd";

const CreateGrid = ({ todos }) => {
  const PAGE_INFO = {
    pageInfo: {
      pageNo: 1,
      pageSize: 200,
    },
  };
  const defaultSortOrder = [{ dataField: "id", sortOrder: "desc" }];
  const GET_COMPANIES = gql`
    query getAllCom($pageInfo: PageInfoInput) {
      companies(pageInfo: $pageInfo) {
        data {
          id
          name
          description
          code
          classification
          country
          state
          address
        }
      }
    }
  `;
  

  const { data, loading, error } = useQuery(GET_COMPANIES, {
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

  const allowedPageSizes = [5, 10, 20, 50, 100, 200];
  console.log(gridData);
  return (
    <>
      
    
      <div className="grid-pager-container">
      
        <DataGrid
          dataSource={gridData}
          keyExpr={"id"}
          showBorders={true}
          allowColumnReordering={true}
        >
           <SearchPanel
            visible={true}
            highlightCaseSensitive={false}
            width={240}
            placeholder="Search..."
            className={"grid-search"}
            defaultSortOrder={defaultSortOrder}
          />

          <Search enabled={true} width={200} />
          <Scrolling rowRenderingMode='standard'></Scrolling>
          
          
          <Paging defaultPageSize={10} />
          <Pager
            visible={true}
            allowedPageSizes={allowedPageSizes}
            displayMode={"compact"}
            showPageSizeSelector={true}
         
            showNavigationButtons={true} />
        
          
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
