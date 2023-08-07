import "./App.css";

import CreateForm from "./components/CreateForm";
import React, { useEffect, useState } from "react";
import DataGrid, { Column } from "devextreme-react/data-grid";
import CreateGrid from "./components/CreateGrid";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://api.dev.sensysio.com/cmms/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTFVRzA3WlpMZnFXSkx3VGdZUURnczBWSS1VSXNGbFk0RzBNRzktM0w0In0.eyJleHAiOjE2OTEzOTc1NDQsImlhdCI6MTY5MTM4NjIzMSwiYXV0aF90aW1lIjoxNjkxMzExMTQ0LCJqdGkiOiIzMTQ3N2YwNi0zYmFiLTQ5ZTEtYWE3ZC04ZDQ5NjMzMGMxOTAiLCJpc3MiOiJodHRwczovL3Nzby5kZXYuc2Vuc3lzaW8uY29tL2F1dGgvcmVhbG1zL2F0aGVucyIsImF1ZCI6ImNtbXMiLCJzdWIiOiI1ZmM0Y2VlNi0xOGExLTRmZTctYTk2NC0yM2QyZjNjOWU1Y2YiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbW1zIiwibm9uY2UiOiJqSmNfeUcwUEQ2Q21sWFBSR2Npb0VSeGpGSGE1eFpJczRCbFVyTWFNYm00Iiwic2Vzc2lvbl9zdGF0ZSI6ImVmNmEwNmNhLTY3YjUtNGU4YS05ODY0LTBiYjRkMjE5ZTgzNSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgY21tcyIsInNpZCI6ImVmNmEwNmNhLTY3YjUtNGU4YS05ODY0LTBiYjRkMjE5ZTgzNSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU29jcmF0ZXMgUGhsaW9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29jcmF0ZXMiLCJnaXZlbl9uYW1lIjoiU29jcmF0ZXMiLCJmYW1pbHlfbmFtZSI6IlBobGlvcyIsInRlbmFudCI6eyJ0aWVyIjoiRnJlZSIsImlkIjoiYXRoZW5zIn0sImVtYWlsIjoic29jcmF0ZXNAZ3JyLmxhIn0.gwVwPw9QbWFRvTM8mhUa3GUwQiVMCzdxbaK8yLw-nmxqOMBzVgdQetRSPwY0tDFff59OaZbH-L9wdsec8JO7VysuYnUfVrXaSOI7NR2a1RLbCnmrCtpTCUtoQDCXLblayAnaOOKIwpvd9kJSjf7GJ-yLZbjuLstvs6NR04IJG_JUH1eLjNjPwUz5Lux215GrEaGU-QKFiqpymSMDS6a9GF6Zoq-O225OYOD8pEwvCx_s8yjW37TaW7P-UDG8DaZ7b56f22CcpETNmOwjZ8wWAup1KD-jiSYkbyHWDiU7ztOUzB-dYerO6uHoZKnDvNLoG8AQwOGURicB6B6MXtxpyQ";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const uri = process.env.REACT_APP_API_URL;
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [tableData, setTableData] = useState([]);
  const flag = false;

  useEffect(() => {
    console.log("Table Data:", tableData);
  }, [flag]);

  const updateGridData = (formData) => {
    setTableData((prevData) => [...prevData, formData]);
  };
  return (
    <>
      <ApolloProvider client={client}>
        <CreateForm flag={flag} />
        <CreateGrid tableData={tableData} />
      </ApolloProvider>
    </>
  );
};

export default App;