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
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJeTFVRzA3WlpMZnFXSkx3VGdZUURnczBWSS1VSXNGbFk0RzBNRzktM0w0In0.eyJleHAiOjE2OTEyNDU1MjEsImlhdCI6MTY5MTIyMzkyMSwiYXV0aF90aW1lIjoxNjkxMjIzOTIxLCJqdGkiOiJkZjkyNmI4OC1kZmI3LTQ1NTgtYmQwMS1hZTk0MzU1NGQ1OGYiLCJpc3MiOiJodHRwczovL3Nzby5kZXYuc2Vuc3lzaW8uY29tL2F1dGgvcmVhbG1zL2F0aGVucyIsImF1ZCI6ImNtbXMiLCJzdWIiOiI1ZmM0Y2VlNi0xOGExLTRmZTctYTk2NC0yM2QyZjNjOWU1Y2YiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbW1zIiwibm9uY2UiOiJ3MVlZOW5SVElwQkNVUDIzdnFqSmNFMnE3MXRHald6QnhKRU9qSlYxcWtjIiwic2Vzc2lvbl9zdGF0ZSI6ImQ1ZjlhNjU0LTEwZWMtNDA0Yy1hNzZkLTMxYjkwZTU0ZmYxMiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgY21tcyIsInNpZCI6ImQ1ZjlhNjU0LTEwZWMtNDA0Yy1hNzZkLTMxYjkwZTU0ZmYxMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU29jcmF0ZXMgUGhsaW9zIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic29jcmF0ZXMiLCJnaXZlbl9uYW1lIjoiU29jcmF0ZXMiLCJmYW1pbHlfbmFtZSI6IlBobGlvcyIsInRlbmFudCI6eyJ0aWVyIjoiRnJlZSIsImlkIjoiYXRoZW5zIn0sImVtYWlsIjoic29jcmF0ZXNAZ3JyLmxhIn0.hJoAH0lFPttLfyfqA0vvD9iHS1sIrY4EZQA7e6PHrQ5Y1zRsrzBrscz8zNZNTEvf1ml7mcTVrJoG8NoN-RghCQ5Akmbr9FAIKKeEkB1tpPlaAI3EnN2Xz6sLFZ04fmBxzz2ZI6OhL5F20CXOQyypz0z6egrllEcsB1wfqq--28mGrnsq35T0GSnKBGlVOXEQ8eVHpaNuDhAOsk0Py9GF1wGBCXvF3z83Zo3Pj9zc5LyLeQs31lEmjP8K834SWXXvUplgl4IhsOrzG6HvRvHf3i8-yGvqpnR6Crd747ckgh2NhoIYEw4yn-gCoMc_VReQ9xWHZ0ClEHHzpJ5edG9KMw"
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
