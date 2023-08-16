import "./App.css";
import React, { useState, useContext, createContext } from "react";
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
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTFVRzA3WlpMZnFXSkx3VGdZUURnczBWSS1VSXNGbFk0RzBNRzktM0w0In0.eyJleHAiOjE2OTIxODcyMTQsImlhdCI6MTY5MjE2NTYxNCwiYXV0aF90aW1lIjoxNjkyMTY1NTk3LCJqdGkiOiIxZDdiNzcxNS0xYWYxLTRjNWItYmU4NS04OGUzYWFjNDU4M2YiLCJpc3MiOiJodHRwczovL3Nzby5kZXYuc2Vuc3lzaW8uY29tL2F1dGgvcmVhbG1zL2F0aGVucyIsImF1ZCI6ImNtbXMiLCJzdWIiOiI1ZmM0Y2VlNi0xOGExLTRmZTctYTk2NC0yM2QyZjNjOWU1Y2YiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbW1zIiwibm9uY2UiOiI2ZUo4ZEhSNkZIdVRDN3FaZzJ5djlwcVFndFRvQnNiNkhyalU4WkhzZjlVIiwic2Vzc2lvbl9zdGF0ZSI6ImI4MjBhYzFjLWVjY2MtNDkwNy05NzcxLTJhMjU2ZjZkZTc3NyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgY21tcyIsInNpZCI6ImI4MjBhYzFjLWVjY2MtNDkwNy05NzcxLTJhMjU2ZjZkZTc3NyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU29jcmF0ZXMgUGhsaW9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29jcmF0ZXMiLCJnaXZlbl9uYW1lIjoiU29jcmF0ZXMiLCJmYW1pbHlfbmFtZSI6IlBobGlvcyIsInRlbmFudCI6eyJ0aWVyIjoiRnJlZSIsImlkIjoiYXRoZW5zIn0sImVtYWlsIjoic29jcmF0ZXNAZ3JyLmxhIn0.iLVonsuwX-HS45OHpKFFdWK885HUReG3BMAsQx8UDCaShO6mROdSBlFjp4EucVfkkSLaIKOmJ031T2mtd6uekGFpTRLTrFO8DSJV8ggVe_E5L6V79i55eDveA_pePQ-gOlqCZ0DoEFw_ExK5jkOkrQbh3VxXA83o7cJkYGrRPUfdlMm0XV4jrcvS_tXia1o2zO_7-ASZU31xMujrT8WggxUnT2YKd4iX3QVUB9Z0gqnR1e7-_OFRHg1j1UsitSVpMwePqxMOK0nmcESoKJjpiTGK24WWFLl_WW6V6Qp8-jgfpcLeutLY94-Qkgd7MnFaqzdS8HoHejp5-WDMuetFCw";
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
  const [editFormData, setEditFormData] = useState();
  return (
    <>
      <ApolloProvider client={client}>
        <EditDataContext.Provider
          value={{ editFormData, setEditFormData, open, setOpen }}
        >
          <CreateForm />
          <CreateGrid />
        </EditDataContext.Provider>
      </ApolloProvider>
    </>
  );
};

export default App;
