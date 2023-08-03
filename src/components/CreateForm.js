import React, { useState, useEffect } from "react";
import "./CreateForm.css";
import { Button, Modal } from "antd";
import { Height } from "devextreme-react/chart";
import TextBox from "devextreme-react/text-box";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { gql, useMutation } from "@apollo/client";

const CREATE_COMPANY = gql`
  mutation createCompany($data: CreateCompanyInput!) {
    createCompany(data: $data) {
      id
      name
      code
      classification
    }
  }
`;
const UPDATE_COMPANY = gql`
  mutation updateCompany($data: UpdateCompanyInput!) {
    updateCompany(data: $data) {
      id
      name
      code
      classification
    }
  }
`;

const CreateForm = ({ tableData, setTableData }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(undefined);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    classification: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [add_Company, {data, loading, error }] = useMutation(CREATE_COMPANY);

  const [update_Company, {data2, loading2, error2 }] = useMutation(UPDATE_COMPANY);

  const handleFormDataChange = (f, val) => {
    setFormData((prevState) => ({
      ...prevState,
      ...(typeof f === "string" && { [f]: val }),
    }));

    console.log(formData);  
  };


  async function myFunction (e) {
    e.preventDefault();
    if (
      formData.classification === "" ||
      formData.name === "" ||
      formData.code === ""
    ) {
      return;
    }
    console.log('id : ' , id);
    if(id)
      await update_Company({ variables: { data: { id, ...formData } } });
    else {
      const data = add_Company({ variables: { data: { ...formData } } });
      data.then(result => { 
        console.log(result);
        console.log(result.data?.createCompany?.id);
        setId(result.data?.createCompany?.id)
      })
    }
  }


  return (
    <>
      <div className="header">
        <div className="title">
          <div className="company">
            <h1>Companies</h1>
          </div>

          <Button
            className="square-big-button"
            type="primary"
            onClick={() => {
              setOpen(true)
              setFormData({
                name: "",
                code: "",
                description: "",
                classification: "",
                address: "",
                city: "",
                state: "",
                country: "",
              }) 
            }}
          >
            Create
          </Button>
        </div>
      </div>

      <Modal
        className="form-modal"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false) }
        width={1000}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="comp-heading">
          <h2>Company</h2>
        </div>

         <section>
          <div className="container">
            <form
              // onChange={(e) => myFunction(e)}
              onBlur={(e) => myFunction(e)}
            >
              <div className="row">
                <div
                  className="general"
                  style={{ display: "inline-flex", width: "100%" }}
                >
                  <div className="col-2 side-heading">General</div>

                  <div className="group">
                    <div className="row">
                      <div className="namecode">
                        <div className="name-field">
                          <label>
                            Name{" "}
                            <span style={{ color: "red" }}>&#160;&#42;</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            placeholder="Enter..."
                            name="name"
                            onBlur={(e) => {
                              handleFormDataChange("name", e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="code-field">
                          <label>
                            Code{" "}
                            <span style={{ color: "red" }}>&#160;&#42;</span>
                          </label>
                          <input
                            type="text"
                            id="code"
                            placeholder="Enter..."
                            name="code"
                            onBlur={(e) =>
                              handleFormDataChange("code", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="status-container">
                      <label>Status</label>
                      <select id="selectBox">
                        <option defaultChecked>Draft</option>
                        <option value="active">Active</option>
                        <option value="inactive">In-Active</option>
                      </select>
                    </div>
                    <br />
                    <div className="description">
                      <label>Description</label>
                      <input
                        className="description"
                        type="textbox"
                        id="description"
                        placeholder="Enter..."
                        name="description"
                        onBlur={(e) =>
                          handleFormDataChange("description", e.target.value)
                        }
                      />
                    </div>
                    <br />
                    <div className="classifies">
                      <label>
                        Classification{" "}
                        <span style={{ color: "red" }}>&#160;&#42;</span>
                      </label>
                      <select
                        id="selectBox"
                        onBlur={(e) =>
                          handleFormDataChange("classification", e.target.value)
                        }
                        required
                      >
                        <option
                          value=""
                          style={{ display: "none" }}
                          disabled
                          selected
                        >
                          Select...
                        </option>
                        <option value="Supplier">Supplier</option>
                        <option value="Manufacturer">Manufacturer</option>
                        <option value="Customer">Customer</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="general"
                  style={{ display: "inline-flex", width: "100%" }}
                >
                  <div className="col-2 side-heading">Address</div>
                  <div className="group">
                    <div className="address" style={{ width: "80%" }}>
                      <label />
                      Address
                      <input
                        type="text"
                        id="address"
                        placeholder="Enter..."
                        name="address"
                        onBlur={(e) =>
                          handleFormDataChange("address", e.target.value)
                        }
                      />
                    </div>

                    <div className="information">
                      <div className="info-field">
                        <label />
                        City
                        <input
                          type="text"
                          id="city"
                          placeholder="Enter..."
                          name="city"
                          onBlur={(e) =>
                            handleFormDataChange("city", e.target.value)
                          }
                        />
                      </div>
                      <div className="info-field">
                        <label />
                        State
                        <input
                          type="text"
                          id="state"
                          placeholder="Enter..."
                          name="state"
                          onBlur={(e) =>
                            handleFormDataChange("state", e.target.value)
                          }
                        />
                      </div>
                      <div className="info-field">
                        <label />
                        Country
                        <input
                          type="text"
                          id="country"
                          placeholder="Enter..."
                          name="country"
                          onBlur={(e) =>
                            handleFormDataChange("country", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section> 
      </Modal> 
    </>
  );
};

export default CreateForm;
