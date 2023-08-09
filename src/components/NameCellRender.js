import React, { useContext } from "react";
import {EditDataContext} from "../App.js";
import ReactDOM from "react-dom/client";

const NameCellRender = ({ e }) => {
  const {setEditFormData, setOpen } = useContext(EditDataContext);

  const DataApply = () => {
    const copyData = { ...e.data };
    delete copyData.__typename;
    setEditFormData(copyData);
    setOpen(true);   
    
  };

  return (
    <span
      onClick={() => {
        DataApply();
      }}
    >
      {e.value}
    </span>
  );
};
export default NameCellRender;
