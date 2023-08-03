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
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTFVRzA3WlpMZnFXSkx3VGdZUURnczBWSS1VSXNGbFk0RzBNRzktM0w0In0.eyJleHAiOjE2OTEwNjcxNjAsImlhdCI6MTY5MTA0NTU2MCwiYXV0aF90aW1lIjoxNjkxMDQ1NTYwLCJqdGkiOiJmMzIwYmJjNi0yOTNjLTQ2M2QtOTJkNC1iZGVjNDkxYWI4NjEiLCJpc3MiOiJodHRwczovL3Nzby5kZXYuc2Vuc3lzaW8uY29tL2F1dGgvcmVhbG1zL2F0aGVucyIsImF1ZCI6ImNtbXMiLCJzdWIiOiI1ZmM0Y2VlNi0xOGExLTRmZTctYTk2NC0yM2QyZjNjOWU1Y2YiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbW1zIiwibm9uY2UiOiJtcU0xRTJRaV94WHVBUFRtcWFkOG5VdGFfSDlPNWQ5eV9TODV4RkNCRWVBIiwic2Vzc2lvbl9zdGF0ZSI6IjQyZGM2YWFkLWUwMjYtNDliMy1iZTRhLWQxMTJkMGYxYjk1YiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgY21tcyIsInNpZCI6IjQyZGM2YWFkLWUwMjYtNDliMy1iZTRhLWQxMTJkMGYxYjk1YiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU29jcmF0ZXMgUGhsaW9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29jcmF0ZXMiLCJnaXZlbl9uYW1lIjoiU29jcmF0ZXMiLCJmYW1pbHlfbmFtZSI6IlBobGlvcyIsInRlbmFudCI6eyJ0aWVyIjoiRnJlZSIsImlkIjoiYXRoZW5zIn0sImVtYWlsIjoic29jcmF0ZXNAZ3JyLmxhIn0.AYD3VlYgonJv6dSdYg871pJZxWiEcZtvqSjvTlk8ChMos0PUXHOYXbwCC-JMXORu37nkwZO2Qnx0tMCoSsjGwPhbapb1QBYx4jemWoVDu3itxj7rRAlfMn-Ma2z-K770ObdTE3cRUkdkUz4iyKPy8n3IkNraO1JN2jtFb0RtFGWthfJibhBeQ79KHBtSi0Xy6HGtfJlPgbRxI057IuYsq8Iny1tZdDFIiah2M-xhZiphfKDK9r3C1bBrhpfAxzSrg60Sli_40qfPjAlMGppYCG1KgIvzRaKQOP2BZh_yBsra-m5uy4UrnC976d06QexODBxdwspmrrPy2ydcfKwQqA"
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

  const addTodo = (todo) => {
    if (tableData.includes(todo)) return;
    setTableData([...tableData, todo]);
  };



  return (
   <>
  
   <ApolloProvider client={client}>
   <CreateForm/>
   <CreateGrid/>
 </ApolloProvider>
 
   
</>
  );
}

export default App;
