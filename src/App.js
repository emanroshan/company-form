// import "./App.css";

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
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTFVRzA3WlpMZnFXSkx3VGdZUURnczBWSS1VSXNGbFk0RzBNRzktM0w0In0.eyJleHAiOjE2OTE1MDYzMTksImlhdCI6MTY5MTQ4NDcxOSwiYXV0aF90aW1lIjoxNjkxNDg0NzE1LCJqdGkiOiJkMDdjNWYyNy0wZDRjLTRmZGEtODcwOS1kMjYyY2U1ZmU0M2UiLCJpc3MiOiJodHRwczovL3Nzby5kZXYuc2Vuc3lzaW8uY29tL2F1dGgvcmVhbG1zL2F0aGVucyIsImF1ZCI6ImNtbXMiLCJzdWIiOiI1ZmM0Y2VlNi0xOGExLTRmZTctYTk2NC0yM2QyZjNjOWU1Y2YiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbW1zIiwibm9uY2UiOiJES1RGY0I1SkhHNmRQQnlrY3h0cEQ1djZkU0dlSzEyNkdrRWszejgxcU5FIiwic2Vzc2lvbl9zdGF0ZSI6IjBmMGIwMzQ0LTUyM2EtNDQxNy1iY2YyLTUxZjc4NDNkNzViNCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgY21tcyIsInNpZCI6IjBmMGIwMzQ0LTUyM2EtNDQxNy1iY2YyLTUxZjc4NDNkNzViNCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU29jcmF0ZXMgUGhsaW9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29jcmF0ZXMiLCJnaXZlbl9uYW1lIjoiU29jcmF0ZXMiLCJmYW1pbHlfbmFtZSI6IlBobGlvcyIsInRlbmFudCI6eyJ0aWVyIjoiRnJlZSIsImlkIjoiYXRoZW5zIn0sImVtYWlsIjoic29jcmF0ZXNAZ3JyLmxhIn0.HHG88DSIUkP6IFeZ5ueHuIz7IHIaCrvsHrjuiC02sDDgmg6eduPHTUptbvOVnXmILzBnXRqHWhdAGOIwn57AneO7fXuoVBWpXd_Mnh5W00sxySwCb0vT69SwB8kIUuBU3ySCLVCPprnAF9tgckJQo7me99THLgJeRBVXykvA40IRZiMa8xpDacVxP4R-XN_OtokSK1o_nLfd8W8z09Hav02Xb8x13KX4jx72xu9C8QmYekFf9VNedMObYJrx9L1FQioH1xmqJd4AC5qg6C9R7ZVwM0VFRmgANpAcnC8hf175dkaAAW2-R0twnmx1mww3DpAlnpiC9lg8Z3Gq9PXyBw";
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
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <ApolloProvider client={client}>
        <CreateForm flag={flag} setFlag={setFlag} open={open} setOpen={setOpen}/>
        <CreateGrid flag={flag} setOpen={setOpen} open={open} />
      </ApolloProvider>
    </>
  );
};

export default App;