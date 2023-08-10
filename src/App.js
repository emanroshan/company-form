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
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTFVRzA3WlpMZnFXSkx3VGdZUURnczBWSS1VSXNGbFk0RzBNRzktM0w0In0.eyJleHAiOjE2OTE2Nzk2ODQsImlhdCI6MTY5MTY1ODA4NCwiYXV0aF90aW1lIjoxNjkxNjU4MDg0LCJqdGkiOiJlZDU2MTU1Ni0xNzNjLTQ1NWMtODVhOC04MjdmNGYwNTdhMTYiLCJpc3MiOiJodHRwczovL3Nzby5kZXYuc2Vuc3lzaW8uY29tL2F1dGgvcmVhbG1zL2F0aGVucyIsImF1ZCI6ImNtbXMiLCJzdWIiOiI1ZmM0Y2VlNi0xOGExLTRmZTctYTk2NC0yM2QyZjNjOWU1Y2YiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbW1zIiwibm9uY2UiOiJVSmo5Q2JLYmIxdlY2bVZTWWpSUnRIRUlNUkpySFp2LU5Id3pwWW1FZGRjIiwic2Vzc2lvbl9zdGF0ZSI6IjkzNDg2YjlmLTMyY2EtNDJkNy1iMjFkLTc4MDU4MjZmMGU0MCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgY21tcyIsInNpZCI6IjkzNDg2YjlmLTMyY2EtNDJkNy1iMjFkLTc4MDU4MjZmMGU0MCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU29jcmF0ZXMgUGhsaW9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29jcmF0ZXMiLCJnaXZlbl9uYW1lIjoiU29jcmF0ZXMiLCJmYW1pbHlfbmFtZSI6IlBobGlvcyIsInRlbmFudCI6eyJ0aWVyIjoiRnJlZSIsImlkIjoiYXRoZW5zIn0sImVtYWlsIjoic29jcmF0ZXNAZ3JyLmxhIn0.Lvnk9pBMjpRRmCGwZfN-1w6QyCWVNeJ5bRHlVWUkV5pskl2h_tm-yOGTZ2-PshSVUwXJFnYZy2FEhg9UMF7lP2tlqCTkkl54iV8lJRHJ73OVdciLcLSm_6HCaT4Apv6uLhPFVBkH7GLaZf_7JQSKUi1Ma9u9WPf4w6i8fz-m3gNvvdAIhPPNB6ifx4iO5XNUpRLWZIY3bQDkkzgYxsQZtTGVO6F-fNXTVpeZzYiu-HG94njHOa3rssbeNJ5fqAG5VazYk7Q4EpyJYdD8IAEi4SygBN8_I_GfcDHCyaL0KwZj-TFMfi5VKTgWQkl9eor8BZX1CyY_qs0dQSTcuXNH5g";
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
