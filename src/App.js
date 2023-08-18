import "./App.css";
import React, { useState } from "react";
import CreateForm from "./components/CreateForm";
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
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTFVRzA3WlpMZnFXSkx3VGdZUURnczBWSS1VSXNGbFk0RzBNRzktM0w0In0.eyJleHAiOjE2OTIyOTEwNzYsImlhdCI6MTY5MjI2OTQ3NiwiYXV0aF90aW1lIjoxNjkyMjUyNDY0LCJqdGkiOiIwM2YzNGZlYi02ZmEzLTRlNzAtODU0MS00YTAwOGNkNTgwZmEiLCJpc3MiOiJodHRwczovL3Nzby5kZXYuc2Vuc3lzaW8uY29tL2F1dGgvcmVhbG1zL2F0aGVucyIsImF1ZCI6ImNtbXMiLCJzdWIiOiI1ZmM0Y2VlNi0xOGExLTRmZTctYTk2NC0yM2QyZjNjOWU1Y2YiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbW1zIiwibm9uY2UiOiJhemtDUDNHVm5hblB6QzJ4dHVDWVlKc3NDb3RUWm9Tc2JLanpna08zdkxNIiwic2Vzc2lvbl9zdGF0ZSI6ImZhODk1ZmZkLWNjNDQtNDVmZS1iMThmLTk1NjFlZGQ5M2M1YSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgY21tcyIsInNpZCI6ImZhODk1ZmZkLWNjNDQtNDVmZS1iMThmLTk1NjFlZGQ5M2M1YSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU29jcmF0ZXMgUGhsaW9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29jcmF0ZXMiLCJnaXZlbl9uYW1lIjoiU29jcmF0ZXMiLCJmYW1pbHlfbmFtZSI6IlBobGlvcyIsInRlbmFudCI6eyJ0aWVyIjoiRnJlZSIsImlkIjoiYXRoZW5zIn0sImVtYWlsIjoic29jcmF0ZXNAZ3JyLmxhIn0.P2f02ozmoi9SjgqOYaENFyIaS0uVXdKXX0JykEWovcHwVmkAoEQJmyaoguNGNo7TZJxPHCPbfa5b4mWXydyOGDUo6_5P2vvT5UKSfYjfWXG13xkXqj0P1gLf6_hOg8WkwL7nX5xMcSIwswOuysfhqOSTD24_hdKuWedadUxk184gnDxA6aI_bgXrNgJidqtoQAwzS0kFIoBsAW1XNAm-6ySXizeKBcN0OPTkJ6sH91fYh0WXSSHM7QAnhQXXV7szeN1ZYV60E8ilyhmDmN9geqtUQZnOtC-st5zUomrjQNvhX2mF6LJHsmKCvSIahxCX-onO_gfNePuxsVSr8e1dXg";
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
});

export const EditDataContext = React.createContext(null);

const App = () => {
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
