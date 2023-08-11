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
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTFVRzA3WlpMZnFXSkx3VGdZUURnczBWSS1VSXNGbFk0RzBNRzktM0w0In0.eyJleHAiOjE2OTE3NjYxMTgsImlhdCI6MTY5MTc0NDUxOCwiYXV0aF90aW1lIjoxNjkxNzM5NDQzLCJqdGkiOiI1MTU0MDk3Ny0yMjY2LTQ5M2ItYjdmOC1lN2I0NDNmYTljYjIiLCJpc3MiOiJodHRwczovL3Nzby5kZXYuc2Vuc3lzaW8uY29tL2F1dGgvcmVhbG1zL2F0aGVucyIsImF1ZCI6ImNtbXMiLCJzdWIiOiI1ZmM0Y2VlNi0xOGExLTRmZTctYTk2NC0yM2QyZjNjOWU1Y2YiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbW1zIiwibm9uY2UiOiJVVE1BZG9TX2tXV2E5emhFVVJNaXJjWlMxQS1EOFRKWmM4N05TRzJfOVRjIiwic2Vzc2lvbl9zdGF0ZSI6ImZhYjUyNzg3LTRkOGYtNGU1NS05YWM1LTM1NWUzNTg1N2M3MiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgY21tcyIsInNpZCI6ImZhYjUyNzg3LTRkOGYtNGU1NS05YWM1LTM1NWUzNTg1N2M3MiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU29jcmF0ZXMgUGhsaW9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29jcmF0ZXMiLCJnaXZlbl9uYW1lIjoiU29jcmF0ZXMiLCJmYW1pbHlfbmFtZSI6IlBobGlvcyIsInRlbmFudCI6eyJ0aWVyIjoiRnJlZSIsImlkIjoiYXRoZW5zIn0sImVtYWlsIjoic29jcmF0ZXNAZ3JyLmxhIn0.FKaBFOQbynaLZDu0TOBeEv2inzM3VHqa9m7fI1o0T7A8dLOE-fQvOtIox1vGzU3lMUvsvcW4wTGrltFnV6MvtP___UAJNov02psIv4XN8JtWlmi-fqfEjUFnHpbx6MHZSwCc3PKOUjJgCpHUc1dSIPkQgA367isUJbSXus9vudO5lZjwbaWiKU7CMDLC9VIid_S8BMf684ap-pMpNMEPHeqYXtKNia0Hkuj3My69Wii8CDnKyRIR2pWq0nZliUfGy9z-gEK9djo8fDU43sFkifO3ZB3j4nepK7om25wr9DSqZ3J9sSFYIkvpR3zHV9_iOAPVITAIUKpoBmoTQTFzCQ";
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
