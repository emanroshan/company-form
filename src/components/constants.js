import { gql } from "@apollo/client";
import NameCellRender from "./NameCellRender";
import StatusCellRender from "./StatusCellRender"

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
        city
        currentStateCode
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
      state
      description
      currentStateId
      currentStateCode
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
      state
      address
      description
      currentStateId
      currentStateCode
    }
  }
`;

export const UPDATE_COMPANY_STATE = gql`
  mutation ChangeCompanyState($Id: Int!, $stateId: Int!) {
    changeCompanyState(id: $Id, stateId: $stateId)
  }
`;

export const GET_UNIQUECODE = gql`
  query GetUniqueCode($concept: PropertyConcept) {
    getUniqueCode(concept: $concept) {
      code
    }
  }
`;
export const initialFormData = {
  id: "",
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
  {dataField: "name", caption: "Name", width: 200, cellRender: (e) => <NameCellRender e={e} />},
  { dataField: "code", caption: "Code", width: 200 },
  { dataField: "currentStateCode", caption: "Status", width: 200, allowEditing: true, editCellRender: (cell) => <StatusCellRender cell={cell} />},
  {dataField: "description",caption: "Description",width: 200,allowHeaderFiltering: false,},
  { dataField: "classification", caption: "Classification", width: 200 },
  {dataField: "address",caption: "Address",width: 200,allowHeaderFiltering: false},
  {dataField: "city",caption: "City",width: 200,allowHeaderFiltering: false},
  { dataField: "state", caption: "State", width: 200 },
  { dataField: "country", caption: "Country", width: 200 },
];

export const filter_columns = [
    {dataField: "name", caption: "Name", width: 200},
    { dataField: "currentStateCode", caption: "Status", width: 200},
    { dataField: "classification", caption: "Classification", width: 200 },
]
export const disabledColumns = [
  { dataField: "name", caption: "Name", width: 200 },
  { dataField: "currentStateCode", caption: "Status", width: 200},
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

export const statuses = [
  { id: 1, name: "Draft"},
  { id: 3, name: "Active"},
  { id: 4, name: "In-Active"},
];
