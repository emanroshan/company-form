import "./App.css";
import React, { useState, useContext,createContext } from "react";
import CreateForm from "./components/CreateForm";
import CreateGrid from "./components/CreateGrid";

import ReactDOM from "react-dom/client";


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
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTFVRzA3WlpMZnFXSkx3VGdZUURnczBWSS1VSXNGbFk0RzBNRzktM0w0In0.eyJleHAiOjE2OTE2MTE1MTUsImlhdCI6MTY5MTU4OTkxNSwiYXV0aF90aW1lIjoxNjkxNTcxNTE4LCJqdGkiOiIwY2Q2NjcwMS03YzU4LTQ5NzktYjRlMS1lZThhZmViMDk5NTgiLCJpc3MiOiJodHRwczovL3Nzby5kZXYuc2Vuc3lzaW8uY29tL2F1dGgvcmVhbG1zL2F0aGVucyIsImF1ZCI6ImNtbXMiLCJzdWIiOiI1ZmM0Y2VlNi0xOGExLTRmZTctYTk2NC0yM2QyZjNjOWU1Y2YiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbW1zIiwibm9uY2UiOiIwdU1qT2o2RVhucWoybEJzd1RNRG03NWRwb2xFMHJWTFJZenZ3bVd3U21ZIiwic2Vzc2lvbl9zdGF0ZSI6ImU2ZWZmZjEzLTdkOTAtNDlkNC04NDlhLWMwZDc5MjI4ZDZlMCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgY21tcyIsInNpZCI6ImU2ZWZmZjEzLTdkOTAtNDlkNC04NDlhLWMwZDc5MjI4ZDZlMCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU29jcmF0ZXMgUGhsaW9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29jcmF0ZXMiLCJnaXZlbl9uYW1lIjoiU29jcmF0ZXMiLCJmYW1pbHlfbmFtZSI6IlBobGlvcyIsInRlbmFudCI6eyJ0aWVyIjoiRnJlZSIsImlkIjoiYXRoZW5zIn0sImVtYWlsIjoic29jcmF0ZXNAZ3JyLmxhIn0.joKZrIj38DHkRZJZoRRohx_Ie1qTg-BQmfL4G_XdHzDsFdoOpy1ZY3GQe4dgS_P0mKxLtpBZhrB3xwIu2oQBBLFwgBU6I2iWfhz74BJfgIYe3eQzd0eJfvHRhO7Zt-Bum90q4O_bmsGfV0N7ICNSAKHeaDEODbDp-Ftk7p9m5ofTk7CDPpNgWBqVMo7LzJ1iyiB07b2UnAbXjJs4UvQs35mCDkHFewWc9WXSGdMPm-eTcyCXNcK51_qokZpbF3LiTpL_F0Hvpb9xD2XjfUYHPJLJw7lWILVFxmuHgj2IUxnvlf4Q4R5Lz37Atck9g0S0ximpml5bQfiDnn7voU-XFw";
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

export const EditDataContext = React.createContext(null);

const App = () => {
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [editFormData, setEditFormData] = useState()
  return (
    <>
      <ApolloProvider client={client}>
        <EditDataContext.Provider value={{editFormData, setEditFormData, open, setOpen}}>
        <CreateForm/>
        <CreateGrid/>
        </EditDataContext.Provider>
      </ApolloProvider>
    </>
  );
};

export default App;