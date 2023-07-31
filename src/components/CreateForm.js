import React, { useState, useEffect } from 'react';
import './CreateForm.css';


const CreateForm = ({ tableData, setTableData }) => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
  
    const handleNameChange = (e) => {
      setName(e.value);
    };
    const handleCodeChange = (e) => {
        setCode(e.value);
      };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.value);
    };
    const handleAddressChange = (e) => {
        setAddress(e.value);
      };
      const handleCityChange = (e) => {
        setCity(e.value);
      };
      const handleProChange = (e) => {
        setProvince(e.value);
      };
      const handleCountryChange = (e) => {
        setCountry(e.value);
      };

      const handleFormSubmit = () => {
      
        setTableData([...tableData, { name, description, completed }]);
        setCompleted(undefined);
        setName('')
        setDescription('')
      };
    
      const handleStatus = () => {
        var selectBox = document.getElementById("selectBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        setCompleted(selectedValue);
      }
    return (
        <>
            <section>
                <div class="container">
                    <form class="company">
                        <div class="column1">
                            <p>General
                                <div class="General">
                                    <label>Name
                                        <span />&#42;
                                    </label>
                                    <input type="text" id="name" placeholder="Enter..." name="name" onChange={handleNameChange} value={name} required />

                                    <label>Code
                                        <span />&#42;
                                    </label>
                                    <input type="text" id="code" placeholder="Enter..." name="code" onChange={handleCodeChange} value={code} required />

                                    <br />
                                    <div class="status-container" >
                                        <label>Status</label>
                                        <select  id="selectBox" onChange={handleStatus}>
                                            <option defaultChecked>Draft</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Incompleted">Incompleted</option>
                                        </select>

                                    </div>
                                    <br />
                                    <label />Description

                                    <input class="description" type="textbox" id="description" placeholder="Enter..." name="description" value={description} onChange={handleDescriptionChange} />
                                    <br />
                                    <label>Classification
                                        <span />&#42;
                                    </label>
                                    <select id="selectBox" onChange={handleStatus} required>
                                        <option defaultChecked placeholder='Select...'>Select</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Incompleted">Incompleted</option>
                                    </select>


                                </div>
                            </p>
                        </div>
                        <div class="column2">
                            <p>Address
                                <div class="group">

                                    <label />Address

                                    <input type="text" id="address" placeholder="Enter..." name="address" onChange={handleAddressChange} value={address} />
                                    <br />
                                    <label />City
                                    <input type="text" id="city" placeholder="Enter..." name="city" onChange={handleCityChange} value={city}  />
                                    <label />State
                                    <input type="text" id="state" placeholder="Enter..." name="state"  onChange={handleProChange} value={province}/>
                                    <label />Country
                                    <input type="text" id="country" placeholder="Enter..." name="country"  onChange={handleCountryChange} value={country}/>


                                </div></p></div>
                    </form>

                </div>
            </section>
            <button type='submit' onClick={handleFormSubmit}>Add</button>
        </>
    );
};

export default CreateForm;
