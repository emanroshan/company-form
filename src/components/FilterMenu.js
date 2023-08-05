import React, { useState } from "react";
import { Popup, DropDownButton, RadioGroup } from "devextreme-react";
import "./FilterMenu.css"; // Create a CSS file for styling (optional)
const filterOptions = ["Option 1", "Option 2", "Option 3"];
const handleOptionSelect = (value) => {
  // value will contain the selected option
  console.log("Selected Option:", value);
  // Implement your filtering logic here
};
const FilterMenu = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <Popup
        visible={popupVisible}
        onHiding={() => setPopupVisible(false)}
        closeOnOutsideClick={true}
        showTitle={true}
        title="Filter Options"
        width={200}
        height={180}
      >
        <RadioGroup
          items={filterOptions}
          value={selectedOption}
          layout="vertical"
          onValueChanged={(e) => {
            setSelectedOption(e.value);
            handleOptionSelect(e.value);
            setPopupVisible(false);
          }}
        />
      </Popup>
      <DropDownButton
        text="Filter"
        icon="filter"
        stylingMode="outlined"
        onClick={() => setPopupVisible(true)}
      />
    </>
  );
};

export default FilterMenu;
