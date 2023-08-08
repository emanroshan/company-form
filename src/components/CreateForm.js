import React, { useState, useEffect } from "react";
import "./CreateForm.css";
import { Button, Modal } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_COMPANY, UPDATE_COMPANY, initialFormData } from "./constants";

const CreateForm = ({ flag, setFlag, open, setOpen }) => {

  const [id, setId] = useState(undefined);
  const [formData, setFormData] = useState(initialFormData);

  const [add_Company, { data, loading, error }] = useMutation(CREATE_COMPANY);
  const [update_Company, { data2, loading2, error2 }] = useMutation(UPDATE_COMPANY);

  const handleFormDataChange = (f, val) => {
    setFormData((prevState) => ({
      ...prevState,
      ...(typeof f === "string" && { [f]: val }),
    }));
  };

  useEffect(() => {
    if (
      formData.classification === "" ||
      formData.name === "" ||
      formData.code === ""
    ) {
      return;
    }
    if (id){
      update_Company({ variables: { data: { id, ...formData } } });
    }
    else {
      const data = add_Company({ variables: { data: { ...formData } } });
      data.then((result) => {
        setId(result.data?.createCompany?.id);
      });
    }
    setFlag(!flag);
    console.log("formData : ", formData);
  }, [formData]);

  const handleClick = () => {
     setOpen(true)
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
            onClick={() => handleClick()}
          >
            Create
          </Button>
        </div>
      </div>

    
      <Modal
        className="form-modal"
        open={open}
        destroyOnClose
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="comp-heading">
          <h2>Company</h2>
        </div>

        <section>
          <div className="container">
            <form>
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
                            <span style={{ color: "rgb(236,23,18)" }}>&#160;&#42;</span>
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
                            <span style={{ color: "rgb(236,23,18)" }}>&#160;&#42;</span>
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
                      <select id="selectBox" disabled={!id}>
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
                        disabled={!id}
                      />
                    </div>
                    <br />
                    <div className="classifies">
                      <label>
                        Classification{" "}
                        <span style={{ color: "rgb(236,23,18)" }}>&#160;&#42;</span>
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
                          defaultChecked
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
                        disabled={!id}
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
                          disabled={!id}
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
                          disabled={!id}
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
                           disabled={!id}
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
