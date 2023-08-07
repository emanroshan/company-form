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
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTFVRzA3WlpMZnFXSkx3VGdZUURnczBWSS1VSXNGbFk0RzBNRzktM0w0In0.eyJleHAiOjE2OTEyODAyNDYsImlhdCI6MTY5MTI1ODY0NiwiYXV0aF90aW1lIjoxNjkxMjI5NDc3LCJqdGkiOiIxZDcxZWE0Ny03ZmU2LTQxMzktYjkwYS00MmJjMjA0ZDdlNzYiLCJpc3MiOiJodHRwczovL3Nzby5kZXYuc2Vuc3lzaW8uY29tL2F1dGgvcmVhbG1zL2F0aGVucyIsImF1ZCI6ImNtbXMiLCJzdWIiOiI1ZmM0Y2VlNi0xOGExLTRmZTctYTk2NC0yM2QyZjNjOWU1Y2YiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbW1zIiwibm9uY2UiOiJjdXd3QTN6WEEwcm55OFRWaktzTTJ0RFY3bUIyVW1RTW9mOFUxbmplVzVBIiwic2Vzc2lvbl9zdGF0ZSI6ImNjMzhjMjVhLThmODktNDIxOS1iZDMzLWJkYzE3M2I3M2Q3MCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgY21tcyIsInNpZCI6ImNjMzhjMjVhLThmODktNDIxOS1iZDMzLWJkYzE3M2I3M2Q3MCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU29jcmF0ZXMgUGhsaW9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29jcmF0ZXMiLCJnaXZlbl9uYW1lIjoiU29jcmF0ZXMiLCJmYW1pbHlfbmFtZSI6IlBobGlvcyIsInRlbmFudCI6eyJ0aWVyIjoiRnJlZSIsImlkIjoiYXRoZW5zIn0sImVtYWlsIjoic29jcmF0ZXNAZ3JyLmxhIn0.PwXdP6V7q3dmiECcgXOdKQxntEpu2IKS8fufJ_wNsnJUCAQ6lBfl7AUmz5FyId97aptrDTnNEcYnC4mjESWUs1ZySmJrkLKZg72E-XMjIkrQSyLynJoQKpYwDVGsiuclisWNRRmnjrl8WB1AYvzbVEx3_b-RGkDeCClrSvm3iQu-w7vuQxuRnnpdegCQO_b8btmkOSHB5W4MwxXyeazjHODO-KBkJ6Dw7oBh1dAX7qchzIO56KrSzOcbnyCcR4gPjywTEU7DaB_9iEa34y9ZliPhkbJtUBSPrJvd4inNwEI9tZnwErCy0dBgWt0F6P1f6Wohyt-RGhh1Yrbk_nvJbQ";
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
