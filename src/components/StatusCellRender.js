import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import { UPDATE_COMPANY_STATE, statuses } from './constants.js';
import { useMutation } from '@apollo/client';

const statusLabel = { 'aria-label': 'Status' };


const StatusCellRender = ({ cell}) => {
    const [status_Company, { data, loading, error }] = useMutation(UPDATE_COMPANY_STATE);


  const itemRender = (data) => {
    if (data != null) {
      return (
        <div>
          <span className="middle">{data.name}</span>
        </div>
      );
    }
    return <span>(All)</span>;
  };

  const handleValueChanged = (e) => {

      if (cell && cell.setValue) {
        cell.setValue(e.value)
      }

    status_Company({ variables: { Id: cell.data.id, stateId: e.value } });
  };
  return (
    <SelectBox
    value={cell.value}
    dataSource={statuses}
    displayExpr="name"
    valueExpr="id"
    onValueChanged={handleValueChanged}
    inputAttr={statusLabel}
    itemRender={itemRender}
    />
  );
};

export default StatusCellRender;
