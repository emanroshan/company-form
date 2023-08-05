import { gql } from "@apollo/client";

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