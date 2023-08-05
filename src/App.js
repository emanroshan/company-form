import './App.css';

import CreateForm from "./components/CreateForm";
import React, { useEffect , useState} from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import CreateGrid from './components/CreateGrid';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: 'https://api.dev.sensysio.com/cmms/graphql',
});

const authLink = setContext((_, { headers }) => {
const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTFVRzA3WlpMZnFXSkx3VGdZUURnczBWSS1VSXNGbFk0RzBNRzktM0w0In0.eyJleHAiOjE2OTEyNTg0NzksImlhdCI6MTY5MTIzNjg3OSwiYXV0aF90aW1lIjoxNjkxMjI5NDc3LCJqdGkiOiJkNTUxNmE1NC0yNGZkLTQ4MDItYTZiOC1mMWFjZDgxZTNkYTgiLCJpc3MiOiJodHRwczovL3Nzby5kZXYuc2Vuc3lzaW8uY29tL2F1dGgvcmVhbG1zL2F0aGVucyIsImF1ZCI6ImNtbXMiLCJzdWIiOiI1ZmM0Y2VlNi0xOGExLTRmZTctYTk2NC0yM2QyZjNjOWU1Y2YiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbW1zIiwibm9uY2UiOiJEakxLejVaV1lNdVFqZWRBR0hBWlR6QWJKOXlwZUE5eVl2NWpLUFFWOEZVIiwic2Vzc2lvbl9zdGF0ZSI6ImNjMzhjMjVhLThmODktNDIxOS1iZDMzLWJkYzE3M2I3M2Q3MCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgY21tcyIsInNpZCI6ImNjMzhjMjVhLThmODktNDIxOS1iZDMzLWJkYzE3M2I3M2Q3MCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU29jcmF0ZXMgUGhsaW9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29jcmF0ZXMiLCJnaXZlbl9uYW1lIjoiU29jcmF0ZXMiLCJmYW1pbHlfbmFtZSI6IlBobGlvcyIsInRlbmFudCI6eyJ0aWVyIjoiRnJlZSIsImlkIjoiYXRoZW5zIn0sImVtYWlsIjoic29jcmF0ZXNAZ3JyLmxhIn0.Rz7d5lxd1GgS58AGFPWPkcDUpIkLqbjHIJfaqnBpyzGHc48O7jspwctASDuiTrUsg52UIoPpc_mfwol6iw2UVtnOagK-QaJMCTJ5YDZpUhztKVnc4utJKbSOCokY6E8AOQrDyiliRoDzoUdszmiGFXbwRD2sq673fCiJcdEjTIEXuYYfIFGU62pbdZP8_ElLVKCYRHMs5w5WqfZoWI_aHq97qDygXlq6Qgt4-Dowt60v-7pSTwxBwc5xSnF2e7T-1UVq4PKZQu4HQgC1pz_MF4HgxwwhX5c9Pv-Q8nq341997r3e3vt6sptK_imHaMUYKXVzaOz-8pKXSntkNXrJ7A"
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const uri = process.env.REACT_APP_API_URL;
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => {
  const [tableData, setTableData] = useState([]);
  const flag = false;

  const addTodo = (todo) => {
    if (tableData.includes(todo)) return;
    setTableData([...tableData, todo]);
  };
  useEffect(() => {
    console.log('Table Data:', tableData);
    
  }, [flag]);

  const updateGridData = (formData) => {
    setTableData((prevData) => [...prevData, formData]);
  };
  return (
   <>
  
   <ApolloProvider client={client}>
<CreateForm  flag={flag}/>
<CreateGrid  tableData={tableData} />
 </ApolloProvider>
 
   
</>
  );
}

export default App;
