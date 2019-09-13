import React from 'react';

import CustomizedRadio from 'css/ComponentStyles/FormFields/CustomFields/CustomizedRadio'

const RadioButton = (props) => (
  <div>
    {props.options.map((option, key) => {
      return (
        <div  className="radio-fields-container" key={option}>
          <CustomizedRadio >
            <input type="radio" id={key}
              className="form-check-input"
              name={props.propName}
              onChange={props.onChange}
              value={option}
            /> {option}
            <span className="checked-circle"></span>

          </CustomizedRadio>
        </div>
      )
    }

    )}
  </div>



)

export default RadioButton;