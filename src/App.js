import './App.css';

import CreateForm from "./components/CreateForm";
import React, { useEffect , useState} from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';

const App = () => {
  const [tableData, setTableData] = useState([]);

  const addTodo = (todo) => {
    if (tableData.includes(todo)) return;
    setTableData([...tableData, todo]);
  };

  useEffect(() => {
    console.log('Table Data:', tableData);
  }, [tableData]);

  useEffect(() => {
    // Get the popup form element and the button to open the form
    const popupForm = document.getElementById("popupForm");
    const openPopupBtn = document.getElementById("openPopupBtn");

    // Function to open the popup form
    function openPopup() {
      popupForm.style.display = "block";
    }

    // Function to close the popup form
    function closePopup() {
      popupForm.style.display = "none";
    }

    // Attach event listeners
    if (openPopupBtn && popupForm) {
      openPopupBtn.addEventListener("click", openPopup);
      popupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get the form input values
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const address = document.getElementById("address").value;

        // Do something with the data (e.g., send it to the server, display it on the page, etc.)
        console.log("Name:", name);
        console.log("Age:", age);
        console.log("Address:", address);

        // Close the popup form after submitting
        closePopup();
      });
    }
  }, []);



  return (
   <>
   <p>abcd</p>
   <CreateForm/>
   {/* <button class="click" name ="click" id="click"onClick={openPopup} >Create</button> */}
   <br />
  
     
</>
  );
}

export default App;
