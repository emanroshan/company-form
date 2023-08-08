import { gql } from "@apollo/client";
import NameCellRender from "./NameCellRender"

export const GET_COMPANY = gql`
query getComp($id: Int!) {
    company(id: $id) {
      id
      name
      code
      description
      classification
      address
      city
      state
      country
    }
  }
  `;

export const GET_COMPANIES = gql`
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

export const CREATE_COMPANY = gql`
  mutation createCompany($data: CreateCompanyInput!) {
    createCompany(data: $data) {
      id
      name
      code
      classification
      country
      city
      address
      description
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation updateCompany($data: UpdateCompanyInput!) {
    updateCompany(data: $data) {
      id
      name
      code
      classification
      country
      city
      address
      description
    }
  }
`;

export const initialFormData = {
  name: "",
  code: "",
  description: "",
  classification: "",
  address: "",
  city: "",
  state: "",
  country: "",
};

export const columns = [
  { dataField: "name", caption: "Name", width: 200, cellRender: (e) => <NameCellRender e={e}/> },
  { dataField: "code", caption: "Code", width: 200 },
  { dataField: "status", caption: "Status", width: 200, allowEditing: true },
  { dataField: "description", caption: "Description", width: 200, allowHeaderFiltering: false },
  { dataField: "classification", caption: "Classification", width: 200 },
  { dataField: "address", caption: "Address", width: 200, allowHeaderFiltering: false },
  { dataField: "city", caption: "City", width: 200, allowHeaderFiltering: false },
  { dataField: "state", caption: "State", width: 200 },
  { dataField: "country", caption: "Country", width: 200 },
];

export const disabledColumns = [
  { dataField: "name", caption: "Name", width: 200 },
  { dataField: "code", caption: "Code", width: 200 },
];

export const filteredColumnsValues = {
  name: [],
  code: [],
  status: [],
  description: [],
  classification: [],
  address: [],
  city: [],
  state: [],
  country: [],
};

export const statuses = [{
    id: 1, name: 'Draft',
  }, {
    id: 2, name: 'Active',
  }, {
    id: 3, name: 'In-Active',
  }, 
  ];

 