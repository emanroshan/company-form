import React, { useState, useEffect, useContext, useRef } from "react";
import { EditDataContext } from "../App.js";
import "./CreateForm.css";
import { Button, Modal } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_COMPANY,
  UPDATE_COMPANY,
  UPDATE_COMPANY_STATE,
  initialFormData,
  statuses,
} from "./constants";
import { useCode } from "../hooks/useCode.js";
import SelectBox from "devextreme-react/select-box";
const statusLabel = { "aria-label": "Status" };

const CreateForm = () => {
  const { editFormData, open, setOpen } = useContext(EditDataContext);

  const [formData, setFormData] = useState(initialFormData);
  const [sendCall, setSendCall] = useState(false);
  const [status, setStatus] = useState("Draft");

  const [add_Company, { data, loading, error }] = useMutation(CREATE_COMPANY);
  const [update_Company, { data2, loading2, error2 }] =
    useMutation(UPDATE_COMPANY);
  const [status_Company, { data3, loading3, error3 }] =
    useMutation(UPDATE_COMPANY_STATE);

  const handleFormDataChange = (f, val) => {
    setFormData((prevState) => ({
      ...prevState,
      ...(typeof f === "string" && { [f]: val }),
    }));
  };

  useEffect(() => {
    console.log(status);
  }, [status]);
  useEffect(() => {
    if (editFormData) {
      setFormData(editFormData);
      setStatus(editFormData.currentStateCode);
    }
    console.log(editFormData);
  }, [editFormData]);

  useEffect(() => {
    if (
      formData.classification === "" ||
      formData.name === "" ||
      formData.code === ""
    ) {
      return;
    }
    if (formData.id) {
      const copyData = { ...formData };
      delete copyData.currentStateCode;
      update_Company({ variables: { data: { ...copyData } } });
    } else {
      const copyData = { ...formData };
      delete copyData.id;
      delete copyData.currentStateCode;
      const data = add_Company({ variables: { data: { ...copyData } } });
      data.then((result) => {
        formData.id = result.data?.createCompany?.id;
      });
    }
  }, [sendCall]);

  const handleClick = () => {
    setOpen(true);
  };

  const codeElement = useRef();
  const { code, onClick } = useCode();

  const focusInput = async () => {
    formData.code = await onClick();
    codeElement.current.focus();
  };

  const handleModalClose = () => {
    setOpen(false);
    setFormData(initialFormData);
    formData.code = "";
    setStatus("Draft");
  };
  const itemRender = (data3) => {
    if (data3 != null) {
      return (
        <div>
          <span className="middle">{data3.name}</span>
        </div>
      );
    }
    return <span>(All)</span>;
  };

  const handleValueChanged = async (e) => {
    if (!formData.id) {
      return;
    }
    const { data } = await status_Company({
      variables: { Id: formData.id, stateId: e.value },
    });
    if (data) {
      if (e.value === 3) setStatus("Active");
      else if (e.value === 4) setStatus("In-Active");
      else setStatus("Draft");
    }
  };

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
        onOk={() => setOpen(true)}
        onCancel={() => handleModalClose()}
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
                            Name
                            <span style={{ color: "rgb(236,23,18)" }}>
                              &#160;&#42;
                            </span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            placeholder="Enter..."
                            name="name"
                            value={formData.name}
                            onChange={(e) => {
                              handleFormDataChange("name", e.target.value);
                            }}
                            onBlur={() => setSendCall(!sendCall)}
                            required
                          />
                        </div>
                        <div className="code-field">
                          <label>
                            Code
                            <span style={{ color: "rgb(236,23,18)" }}>
                              &#160;&#42;
                            </span>
                          </label>
                          <div className="unique-code">
                            <input
                              type="text"
                              id="code"
                              placeholder="Enter..."
                              name="code"
                              ref={codeElement}
                              value={formData.code}
                              onChange={(e) =>
                                handleFormDataChange("code", e.target.value)
                              }
                              onBlur={() => setSendCall(!sendCall)}
                              required
                            />

                            <button
                              className="button-code"
                              id="clear"
                              onClick={focusInput}
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="status-container">
                      <label>Status</label>
                      <SelectBox
                        displayValue={status}
                        placeholder={status}
                        className={`${!formData.id && "disable"} status-cont`}
                        disabled={!formData.id}
                        dataSource={statuses.filter((data) => data.name !== status)}
                        displayExpr="name"
                        valueExpr="id"
                        onValueChanged={handleValueChanged}
                        inputAttr={statusLabel}
                      />
                    </div>
                    <br />
                    <div className="description">
                      <label>Description</label>
                      <input
                        className={`${!formData.id && "disable"} description`}
                        type="textbox"
                        id="description"
                        placeholder="Enter..."
                        name="description"
                        value={formData.description}
                        onChange={(e) =>
                          handleFormDataChange("description", e.target.value)
                        }
                        onBlur={() => setSendCall(!sendCall)}
                        disabled={!formData.id}
                      />
                    </div>
                    <br />
                    <div className="classifies">
                      <label>
                        Classification{" "}
                        <span style={{ color: "rgb(236,23,18)" }}>
                          &#160;&#42;
                        </span>
                      </label>
                      <select
                        id="selectBox"
                        value={formData.classification}
                        onChange={(e) =>
                          handleFormDataChange("classification", e.target.value)
                        }
                        onBlur={() => setSendCall(!sendCall)}
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
                        className={`${!formData.id && "disable"}`}
                        value={formData.address}
                        onChange={(e) =>
                          handleFormDataChange("address", e.target.value)
                        }
                        onBlur={() => setSendCall(!sendCall)}
                        disabled={!formData.id}
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
                          className={`${!formData.id && "disable"}`}
                          value={formData.city}
                          onChange={(e) =>
                            handleFormDataChange("city", e.target.value)
                          }
                          onBlur={() => setSendCall(!sendCall)}
                          disabled={!formData.id}
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
                          className={`${!formData.id && "disable"}`}
                          value={formData.state}
                          onChange={(e) =>
                            handleFormDataChange("state", e.target.value)
                          }
                          onBlur={() => setSendCall(!sendCall)}
                          disabled={!formData.id}
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
                          className={`${!formData.id && "disable"}`}
                          value={formData.country}
                          onChange={(e) =>
                            handleFormDataChange("country", e.target.value)
                          }
                          onBlur={() => setSendCall(!sendCall)}
                          disabled={!formData.id}
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
