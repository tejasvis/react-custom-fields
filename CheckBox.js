import React from 'react';

import {CustomizeCheckBox} from 'css/ComponentStyles/FormFields/CustomFields/CustomizeCheckBox'

const CheckBox = (props) => (
  <div>
    {props.options.map((option, key) => {
      return (

        <div key={option}>
          <CustomizeCheckBox className="label-container">
          {option}
          <input type="checkbox" 
          name={props.name} 
          id={"CheckBox"+key}
          onChange={props.onChange}
          checked={props.checkeditems[option]} 
          value={option}        
          />
          <span className="checkmark"/>

          </CustomizeCheckBox>

        </div>
       
      )
    }

    )}
  </div>



)

export default CheckBox;